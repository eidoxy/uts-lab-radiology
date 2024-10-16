import type { Response, Request } from 'express';
import { Dokter } from '../models/dokter.model';

import {
  createDokter,
  loginDokter,
  getDokters,
  getDokterById,
  updateDokter,
  deleteDokter,
} from "../service/dokter.service";
import { serverError } from '../utils/response';

export async function loginDokterController(req: Request, res: Response) {
  const dokter = req.body as Dokter;

  // ? : check if email and password are provided
  if (!dokter.email || !dokter.password) {
    return res.status(400).send({
      status: 400,
      message: 'Email and password are required',
    });
  }

  try {
    const result = await loginDokter(dokter);

    // ! : set token in cookie if login is successful
    if (result.status === 200 && result.payload) {
      res.cookie('token', result.payload.token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        // sameSite: 'none',
      });
    }

    return res.status(result.status).send(result);
  } catch (error) {
    console.error('An error occurred while logging in dokter: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function createDokterController(req: Request, res: Response) {
  const dokter = req.body as Dokter;

  // ? : check if those field are provided
  if (
    !dokter.nama_dokter ||
    !dokter.npi ||
    !dokter.jenis_kelamin ||
    !dokter.tanggal_lahir ||
    !dokter.telepon ||
    !dokter.email ||
    !dokter.password ||
    !dokter.spesialisasi ||
    !dokter.status_lisensi ||
    !dokter.tanggal_lisensi ||
    !dokter.nama_lisensi
  ) {
    return res.status(400).send({
      status: 400,
      message: 'The field must be filled',
    });
  }

  try {
    const result = await createDokter(dokter);

    // ? : check if result doesn't have status or invalid status
    if (
      !result.status ||
      result.status < 200 ||
      result.status >= 300 ||
      typeof result.status !== 'number'
    ) {
      throw new Error('Invalid status code');
    }

    return res.status(result.status).send(result);
  } catch (error) {
    console.error('An error occurred while creating dokter: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function getDoktersController(req: Request, res: Response) {
  try {
    const result = await getDokters();

    // ? : check if result doesn't have status or invalid status
    if (
      result &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error('An error occurred while getting all dokters: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function getDokterByIdController(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid dokter ID',
    });
  }

  try {
    const result = await getDokterById(id);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else if (result.status == 404) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error('An error occurred while getting dokter by id: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function updateDokterController(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid dokter ID',
    });
  }

  const dokter = req.body as Dokter;

  // ? : check if those field are provided
  if (
    !dokter.nama_dokter ||
    !dokter.npi ||
    !dokter.jenis_kelamin ||
    !dokter.tanggal_lahir ||
    !dokter.telepon ||
    !dokter.email ||
    !dokter.password ||
    !dokter.spesialisasi ||
    !dokter.status_lisensi ||
    !dokter.tanggal_lisensi ||
    !dokter.nama_lisensi
  ) {
    return res.status(400).send({
      status: 400,
      message: 'The field are required',
    });
  }

  try {
    const result = await updateDokter(id, dokter);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else if (result.status == 404) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error('An error occurred while updating dokter: ', error);
    return res.status(serverError.status).send(serverError);
  }
}

export async function deleteDokterController(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid dokter ID',
    });
  }

  try {
    const result = await deleteDokter(id);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status == 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error('An error occurred while deleting dokter: ', error);
    return res.status(serverError.status).send(serverError);
  }
}