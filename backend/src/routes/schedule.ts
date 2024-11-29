import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getScheduleController,
  getScheduleByIdController,
  createScheduleController,
  deleteScheduleController,
} from '../controllers/schedule.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes
  .get('/', getScheduleController)
  .get('/:id', getScheduleByIdController);
  
protectedRoutes
  .use(authenticateToken, authenticateUser)
  .post('/create', createScheduleController)
  .delete('/delete/:id', deleteScheduleController);

const scheduleRoutes = Router();
scheduleRoutes.use(publicRoutes);
scheduleRoutes.use(protectedRoutes);

export default scheduleRoutes;
