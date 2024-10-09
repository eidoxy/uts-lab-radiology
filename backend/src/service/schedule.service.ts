import { Schedule, ScheduleQueryResult } from '../models/schedule.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getSchedules() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<ScheduleQueryResult[]>(`
      SELECT 
        jp.id_jadwal,
        jp.waktu_mulai,
        jp.waktu_selesai,
        jp.ruangan,
        jp.status_jadwal,
        p.nama_lengkap AS pasien,
        d.Nama_Dokter AS dokter,
        pl.nama_petugas_lab AS petugas_lab
      FROM 
        jadwal_pemeriksaan jp
      JOIN 
        pasien p ON jp.id_pasien = p.ID_Pasien
      JOIN 
        dokter d ON jp.id_dokter = d.ID_Dokter
      JOIN 
        petugas_lab pl ON jp.id_petugas_lab = pl.id_petugas_lab
    `);

    // ? : check if there are no schedules
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No schedules found',
      };
    }

    // ! : return the fetched schedules
    return {
      status: 200,
      message: 'Schedules fetched successfully!',
      payload: rows,
    };
  } catch (error) {
    console.error('Database query error:', error);
    return {
      status: 500,
      message: 'Internal server error',
    };
  } finally {
    await db.end();
  }
}

export async function createSchedule(bodyRequest: Schedule) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [result] = await db.query<ResultSetHeader>(
      `
    INSERT INTO jadwal_pemeriksaan ( 
      id_pemeriksaan_lab_dan_radiologi, 
      id_petugas_lab, 
      id_dokter, 
      waktu_mulai, 
      waktu_selesai, 
      ruangan, 
      status_jadwal,
      id_pasien
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `,
      [
        bodyRequest.id_pemeriksaan_lab_dan_radiologi,
        bodyRequest.id_petugas_lab,
        bodyRequest.id_dokter,
        bodyRequest.waktu_mulai,
        bodyRequest.waktu_selesai,
        bodyRequest.ruangan,
        bodyRequest.status_jadwal,
        bodyRequest.id_pasien,
      ]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to create schedule',
      };
    }

    // ! : return the created schedule
    return {
      status: 201,
      message: 'Schedule created successfully!',
      payload: {
        id_jadwal: result.insertId, // Ambil ID jadwal yang baru saja ditambahkan
        ...bodyRequest,
      },
    };
  } catch (error) {
    console.error('An error occurred while creating a schedule: ', error);
    return {
      status: 500,
      message: 'Failed to create schedule',
    };
  } finally {
    await db.end();
  }
}