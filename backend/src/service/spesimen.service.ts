import { Spesimen, SpesimenQueryResult } from './../models/spesimen.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getSpesimen() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<SpesimenQueryResult[]>(
      `
        SELECT
          s.id_spesimen,
          s.jenis_spesimen,
          s.tanggal_pengambilan,
          s.lokasi_pengambilan,
          s.tanggal_diterima,
          s.status_spesimen,
          s.catatan,
          p.id_pemeriksaan,
          ps.nama_lengkap,
          d.nama_dokter,
          p.tanggal_permintaan
        FROM
          spesimen s,
          pemeriksaan p,
          pasien ps,
          dokter d
        WHERE
          s.id_spesimen = p.id_spesimen
          AND p.id_pasien = ps.id_pasien
          AND p.id_dokter = d.id_dokter
      `
    );

    // ? : check if there are no spesimen
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No spesimen found',
      };
    }

    // ! : return the fetched spesimen
    return {
      status: 200,
      message: 'Spesimen fetched successfully!',
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

export async function getSpesimenById(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<SpesimenQueryResult[]>(
      `SELECT * FROM spesimen WHERE id_spesimen = ?`,
      [id]
    );

    // ? : check if the spesimen is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Spesimen with id ${id} not found`,
      };
    }

    // ! : return the fetched spesimen
    return {
      status: 200,
      message: 'Spesimen fetched successfully!',
      payload: rows[0],
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

export async function createSpesimen(bodyRequest: Spesimen) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [resultSpesimen] = await db.query<ResultSetHeader>(
      `INSERT INTO spesimen (jenis_spesimen, tanggal_pengambilan, lokasi_pengambilan, tanggal_diterima, status_spesimen, catatan) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        bodyRequest.jenis_spesimen,
        bodyRequest.tanggal_pengambilan,
        bodyRequest.lokasi_pengambilan,
        bodyRequest.tanggal_diterima,
        bodyRequest.status_spesimen,
        bodyRequest.catatan,
      ]
    );

    const [resultPemeriksaan] = await db.query<ResultSetHeader>(
      `
        UPDATE pemeriksaan SET
        id_spesimen = ?
        WHERE id_pemeriksaan = ?
      `,
      [
        resultSpesimen.insertId,
        bodyRequest.id_pemeriksaan,
      ]
    );

    // ! : return the created spesimen
    return {
      status: 201,
      message: 'Spesimen created successfully!',
      payload: {
        ...bodyRequest,
      },
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

export async function deleteSpesimen(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [result] = await db.query<ResultSetHeader>(
      `DELETE FROM spesimen WHERE id_spesimen = ?`,
      [id]
    );

    // ? : check if the spesimen is not found
    if (result.affectedRows === 0) {
      return {
        status: 404,
        message: `Spesimen with id ${id} not found`,
      };
    }

    // ! : return success message
    return {
      status: 200,
      message: `Spesimen with id ${id} deleted successfully!`,
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