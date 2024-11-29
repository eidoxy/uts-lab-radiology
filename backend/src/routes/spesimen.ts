import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { authenticateUser } from '../middleware/authenticateUser';

import {
  getSpesimenController,
  getSpesimenByIdController,
  createSpesimenController,
  deleteSpesimenController,
} from '../controllers/spesimen.controller';

const publicRoutes = Router();
const protectedRoutes = Router();

publicRoutes
  .get('/', getSpesimenController)
  .get('/:id', getSpesimenByIdController);

protectedRoutes
  .use(authenticateToken, authenticateUser)
  .post('/create', createSpesimenController)
  .delete('/delete/:id', deleteSpesimenController);

const spesimenRoutes = Router();
spesimenRoutes.use(publicRoutes);
spesimenRoutes.use(protectedRoutes);

export default spesimenRoutes;