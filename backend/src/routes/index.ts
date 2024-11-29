import { Router } from 'express';

import adminRoutes from './admin';
import scheduleRoutes from './schedule';
import dokterRoutes from './dokter';
import pasienRoutes from './pasien';
import petugasRoutes from './petugas';
import layananRoutes from './layanan';
import pemeriksaanRoutes from './pemeriksaan';
import spesimenRoutes from './spesimen';

const router = Router();

router
  .use('/admin', adminRoutes)
  .use('/schedule', scheduleRoutes)
  .use('/dokter', dokterRoutes)
  .use('/pasien', pasienRoutes)
  .use('/petugas', petugasRoutes)
  .use('/layanan', layananRoutes)
  .use('/pemeriksaan', pemeriksaanRoutes)
  .use('/spesimen', spesimenRoutes);

export default router;
