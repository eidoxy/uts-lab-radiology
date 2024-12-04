import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  createPetugasController,
  loginPetugasController,
  getPetugasController,
  getPetugasByIdController,
  deletePetugasController,
  // updatePetugasController,
} from '../controllers/petugas.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes.post('/login', loginPetugasController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .get('/', getPetugasController)
  .get('/:id', getPetugasByIdController)
  .post('/create', createPetugasController)
  .delete('/delete/:id', deletePetugasController);
  // .put('/update/:id', updatePetugasController)

const petugasRoutes = Router();
petugasRoutes.use(publicRoutes);
petugasRoutes.use(protectedRoutes);

export default petugasRoutes;
