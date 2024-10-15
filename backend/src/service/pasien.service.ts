import { Pasien, PasienQueryResult } from "../models/pasien.model";

import bcrypt, { compare, hash } from 'bcrypt';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';
import { createToken } from '../utils/token';

export async function loginPasien(bodyRequest: Pasien) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<PasienQueryResult[]>(
      'SELECT * FROM pasien WHERE email = ?',
      [bodyRequest.email]
    );

    // ? : check if the email is incorrect
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Incorrect email!',
      };
    }

    // ? : check if the password is correct
    const pasien = rows[0];

    // ? : compare with the hashed password
    const isPassowrdValid = await compare(
      bodyRequest.password,
      pasien.password
    );

    // ? : check if the password is incorrect
    if (!isPassowrdValid) {
      return {
        status: 401,
        message: 'Incorrect password!',
      };
    }

    // ! : create a token
    const token = createToken({
      id_pasien: pasien.id_pasien,
      nama_lengkap: pasien.nama_lengkap,
      email: pasien.email,
      role: 'pasien',
    });

    // ! : return the token
    return {
      status: 200,
      message: 'Login successful',
      payload: {
        id_pasien: pasien.id_pasien,
        nama_lengkap: pasien.nama_lengkap,
        email: pasien.email,
        token,
      },
    };
  } catch (error) {
    throw error;
  }
}

export async function getPasiens () {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<PasienQueryResult[]>(
      'SELECT * FROM pasien'
    );

    // ? : check if the Pasiens are found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Pasiens not found',
      };
    }

    return {
      status: 200,
      message: 'Get all pasiens successful',
      payload: rows,
    };
  } catch (error) {
    console.error('An error occurred while getting all pasiens: ', error);
    return {
      status: 500,
      message: 'An error occurred while getting all pasiens',
    };
  } finally {
    await db.end();
  }
}

export async function getPasienById (id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<PasienQueryResult[]>(
      'SELECT * FROM pasien WHERE id_pasien = ?',
      [id]
    );

    // ? : check if the Pasien is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Pasien not found',
      };
    }

    return {
      status: 200,
      message: 'Get pasien by id successful',
      payload: rows[0],
    };
  } catch (error) {
    console.error('An error occurred while getting pasien by id: ', error);
    return {
      status: 500,
      message: 'An error occurred while getting pasien by id',
    };
  } finally {
    await db.end();
  }
}

export async function createPasien (bodyRequest: Pasien) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rowsEmail] = await db.query<PasienQueryResult[]>(
      'SELECT * FROM pasien WHERE email = ?',
      [bodyRequest.email]
    );

    // ? check if the email already exists
    if (rowsEmail.length > 0) {
      return {
        status: 409,
        message: `Pasien with email ${bodyRequest.email} already exists`,
      };
    }

    const [rowsKtp] = await db.query<PasienQueryResult[]>(
      'SELECT * FROM pasien WHERE ktp = ?',
      [bodyRequest.ktp]
    );

    // ? check if the ktp already exists
    if (rowsKtp.length > 0) {
      return {
        status: 409,
        message: `Pasien with ktp ${bodyRequest.ktp} already exists`,
      };
    }

    const [rowTelepon] = await db.query<PasienQueryResult[]>(
      'SELECT * FROM pasien WHERE telepon = ?',
      [bodyRequest.telepon]
    );

    // ? check if the telepon already exists
    if (rowTelepon.length > 0) {
      return {
        status: 409,
        message: `Pasien with telepon ${bodyRequest.telepon} already exists`,
      };
    }

    // ? : hash the password
    const hashedPassword = await hash(bodyRequest.password, 10);

    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO pasien (nama_lengkap, nama_panggilan, tanggal_lahir, tempat_lahir, jenis_kelamin, agama, ras, alamat, kode_negara, telepon, bahasa_utama, status_pernikahan, no_rekening, no_sim, kelompok_etnis, email, password, ktp, status_pasien) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        bodyRequest.nama_lengkap,
        bodyRequest.nama_panggilan,
        bodyRequest.tanggal_lahir,
        bodyRequest.tempat_lahir,
        bodyRequest.jenis_kelamin,
        bodyRequest.agama,
        bodyRequest.ras,
        bodyRequest.alamat,
        bodyRequest.kode_negara,
        bodyRequest.telepon,
        bodyRequest.bahasa_utama,
        bodyRequest.status_pernikahan,
        bodyRequest.no_rekening,
        bodyRequest.no_sim,
        bodyRequest.kelompok_etnis,
        bodyRequest.email,
        hashedPassword,
        bodyRequest.ktp,
        bodyRequest.status_pasien,
      ]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to create pasien',
      };
    }

    // ! : create a token
    const token = createToken({
      id_pasien: bodyRequest.id_pasien,
      nama_lengkap: bodyRequest.nama_lengkap,
      email: bodyRequest.email,
    });

    return {
      status: 201,
      message: 'Create pasien successful',
      payload: {
        id: result.insertId,
        ...bodyRequest,
        token,
      },
    };
  } catch (error) {
    console.error('An error occurred while creating pasien: ', error);
    return {
      status: 500,
      message: 'An error occurred while creating pasien',
    };
  } finally {
    await db.end();
  }
}