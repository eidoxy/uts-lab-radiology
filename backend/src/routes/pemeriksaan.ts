import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getPemeriksaanController,
  getPemeriksaanByIdController,
  createPemeriksaanController,
  deletePemeriksaanController,
} from '../controllers/pemeriksaan.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes
  .get('/', getPemeriksaanController)
  .get('/:id', getPemeriksaanByIdController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .post('/create', createPemeriksaanController)
  .delete('/delete/:id', deletePemeriksaanController);

const pemeriksaanRoutes = Router();
pemeriksaanRoutes.use(publicRoutes);
pemeriksaanRoutes.use(protectedRoutes);

export default pemeriksaanRoutes;
