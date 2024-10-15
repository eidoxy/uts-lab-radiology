import { Dokter, DokterQueryResult } from './../models/dokter.model';

import bcrypt, { compare, hash } from 'bcrypt';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';
import { createToken } from '../utils/token';

export async function loginDokter(bodyRequest: Dokter) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<DokterQueryResult[]>(
      'SELECT * FROM dokter WHERE email = ?',
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
    const dokter = rows[0];

    // // ? : compare with the hashed password
    // const isPassowrdValid = await compare(
    //   bodyRequest.password,
    //   dokter.password
    // );

    // // ? : check if the password is incorrect
    // if (!isPassowrdValid) {
    //   return {
    //     status: 401,
    //     message: 'Incorrect password!',
    //   };
    // }

    // ! : create a token
    const token = createToken({
      id_dokter: dokter.id_dokter,
      nama_dokter: dokter.nama_dokter,
      email: dokter.email,
      role: 'dokter',
    });

    // ! : return the token
    return {
      status: 200,
      message: 'Login successful',
      payload: {
        id_dokter: dokter.id_dokter,
        nama_dokter: dokter.nama_dokter,
        email: dokter.email,
        role: 'dokter',
        token,
      },
    };
  } catch (error) {
    console.error('An error occurred while logging in dokter: ', error);
    return {
      status: 500,
      message: 'An error occurred while logging in dokter',
    };
  }
}

export async function getDokters () {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<DokterQueryResult[]>(
      'SELECT * FROM dokter'
    );

    // ? : check if the Dokters are found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Dokters not found',
      };
    }

    return {
      status: 200,
      message: 'Get all dokters successful',
      payload: rows,
    };
  } catch (error) {
    console.error('An error occurred while getting all dokters: ', error);
    return {
      status: 500,
      message: 'An error occurred while getting all dokters',
    };
  } finally {
    await db.end();
  }
}

export async function getDokterById (id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<DokterQueryResult[]>(
      'SELECT * FROM dokter WHERE id_dokter = ?',
      [id]
    );

    // ? : check if the dokter is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Dokter not found',
      };
    }

    return {
      status: 200,
      message: 'Get dokter by id successful',
      payload: rows[0],
    };
  } catch (error) {
    console.error('An error occurred while getting dokter by id: ', error);
    return {
      status: 500,
      message: 'An error occurred while getting dokter by id',
    };
  } finally {
    await db.end();
  }
}

export async function createDokter (bodyRequest: Dokter) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rowsEmail] = await db.query<DokterQueryResult[]>(
      'SELECT * FROM dokter WHERE email = ?',
      [bodyRequest.email]
    );

    // ? check if the email already exists
    if (rowsEmail.length > 0) {
      return {
        status: 409,
        message: `Dokter with email ${bodyRequest.email} already exists`,
      };
    }

    const [rowsTelepon] = await db.query<DokterQueryResult[]>(
      'SELECT * FROM dokter WHERE telepon = ?',
      [bodyRequest.telepon]
    );

    // ? check if the telepon number already exists
    if (rowsTelepon.length > 0) {
      return {
        status: 409,
        message: `Dokter with telepon number ${bodyRequest.telepon} already exists`,
      };
    }

    // ? : hash the password
    const hashedPassword = await hash(bodyRequest.password, 10);

    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO dokter (npi, nama_dokter, jenis_kelamin, tanggal_lahir, telepon, email, password, spesialisasi, status_lisensi, tanggal_lisensi, nama_lisensi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        bodyRequest.npi,
        bodyRequest.nama_dokter,
        bodyRequest.jenis_kelamin,
        bodyRequest.tanggal_lahir,
        bodyRequest.telepon,
        bodyRequest.email,
        hashedPassword,
        bodyRequest.spesialisasi,
        bodyRequest.status_lisensi,
        bodyRequest.tanggal_lisensi,
        bodyRequest.nama_lisensi,
      ]
    );

     // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to create dokter',
      };
    }

    // ! : create a token
    const token = createToken({
      id_dokter: bodyRequest.id_dokter,
      nama_dokter: bodyRequest.nama_dokter,
      email: bodyRequest.email,
    });

    return {
      status: 201,
      message: 'Create dokter successful',
      payload: {
        id: result.insertId,
        ...bodyRequest,
        token,
      },
    };
  } catch (error) {
    console.error('An error occurred while creating dokter: ', error);
    return {
      status: 500,
      message: 'An error occurred while creating dokter',
    };
  } finally {
    await db.end();
  }
}

export async function updateDokter (id: number, bodyRequest: Dokter) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<DokterQueryResult[]>(
      'SELECT * FROM dokter WHERE id_dokter = ?',
      [id]
    );

    // ? : check if the dokter is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Dokter not found',
      };
    }

    // ? : hash the password
    const hashedPassword = await hash(bodyRequest.password, 10);

    const [result] = await db.query<ResultSetHeader>(
      'UPDATE dokter SET npi = ?, nama_dokter = ?, jenis_kelamin = ?, tanggal_lahir = ?, telepon = ?, email = ?, password = ?, spesialisasi = ?, status_lisensi = ?, tanggal_lisensi = ?, nama_lisensi = ? WHERE id_dokter = ?',
      [
        bodyRequest.npi,
        bodyRequest.nama_dokter,
        bodyRequest.jenis_kelamin,
        bodyRequest.tanggal_lahir,
        bodyRequest.telepon,
        bodyRequest.email,
        hashedPassword,
        bodyRequest.spesialisasi,
        bodyRequest.status_lisensi,
        bodyRequest.tanggal_lisensi,
        bodyRequest.nama_lisensi,
        id,
      ]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to update dokter',
      };
    }

    return {
      status: 200,
      message: 'Update dokter successful',
      payload: {
        id,
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

export async function deleteDokter(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<DokterQueryResult[]>(
      'SELECT * FROM dokter WHERE id_dokter = ?',
      [id]
    );

    // ? : check if there is no Dokter with the id
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Dokter with id ${id} not found`,
      };
    }

    const [result] = await db.query<ResultSetHeader>(
      'DELETE FROM dokter WHERE id_dokter = ?',
      [id]
    );

    // ! : return the deleted Dokter
    return {
      status: 200,
      message: `Dokter with id ${id} deleted successfully!`,
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