import { lazy } from 'react';

const ScheduleManagement = lazy(
  () => import('../pages/Admin/Schedule Management')
);
const FormCreateSchedule = lazy(
  () => import('../pages/Admin/Schedule Management/FormCreateSchedule')
);

const coreRoutes = [
  {
    path: '/admin/schedule-management',
    title: 'Schedule Management',
    component: ScheduleManagement,
  },
  {
    path: '/admin/schedule-management/create',
    title: 'Create Schedule',
    component: FormCreateSchedule,
  },
];

const scheduleRoutes = [...coreRoutes];
export default scheduleRoutes;