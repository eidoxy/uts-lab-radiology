import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  createDokterController,
  loginDokterController,
  getDoktersController,
  getDokterByIdController,
  updateDokterController,
  deleteDokterController,
} from '../controllers/dokter.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes.post('/login', loginDokterController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .get('/', getDoktersController)
  .get('/:id', getDokterByIdController)
  .post('/create', createDokterController)
  .put('/update/:id', updateDokterController)
  .delete('/delete/:id', deleteDokterController);

const dokterRoutes = Router();
dokterRoutes.use(publicRoutes);
dokterRoutes.use(protectedRoutes);

export default dokterRoutes;
