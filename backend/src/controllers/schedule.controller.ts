import { Response, Request } from 'express';
import { Schedule } from '../models/schedule.model';

import {
  getSchedules,
  getScheduleById,
  createSchedule,
  deleteSchedule,
} from '../service/schedule.service';
import { serverError } from '../utils/response';

export async function getScheduleController(
  req: Request,
  res: Response
) {
  try {
    const result = await getSchedules();

    // ? : check if result is doesn't have status or invalid status
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
    console.error(
      'An error occurred while getting all schedule: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function getScheduleByIdController(
  req: Request,
  res: Response
) {
  const id = parseInt(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid schedule ID',
    });
  }

  try {
    const result = await getScheduleById(id);

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
    console.error(
      'An error occurred while getting schedule by id: ',
      error
    );
    return res.status(serverError.status).send(serverError);
  }
}

export async function createScheduleController(
  req: Request,
  res: Response
) {
  const bodyRequest: Schedule = req.body;

  try {
    const result = await createSchedule(bodyRequest);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status === 'number'
    ) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error('An error occurred while creating a schedule: ', error);
    return res.status(500).send({
      status: 500,
      message: 'Failed to create schedule',
    });
  }
}

export async function deleteScheduleController(
  req: Request,
  res: Response
) {
  const id = parseInt(req.params.id);

  // ? : check if id is not a number
  if (isNaN(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid schedule ID',
    });
  }

  try {
    const result = await deleteSchedule(id);

    // ? : check if result doesn't have status or invalid status
    if (
      result.status &&
      result.status >= 200 &&
      result.status < 300 &&
      typeof result.status === 'number'
    ) {
      return res.status(result.status).send(result);
    } else if (result.status == 404) {
      return res.status(result.status).send(result);
    } else {
      throw new Error('Invalid status code');
    }
  } catch (error) {
    console.error('An error occurred while deleting schedule: ', error);
    return res.status(500).send({
      status: 500,
      message: 'Failed to delete schedule',
    });
  }
}