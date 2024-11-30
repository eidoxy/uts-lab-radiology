import { lazy } from 'react';

const AdminManagement = lazy(
  () => import('../pages/Admin/Admin Management')
);
const FormCreateAdmin = lazy(
  () => import('../pages/Admin/Admin Management/FormCreateAdmin')
);

const coreRoutes = [
  {
    path: '/admin/admin-management',
    title: 'Admin Management',
    component: AdminManagement,
  },
  {
    path: '/admin/admin-management/create',
    title: 'Create Admin',
    component: FormCreateAdmin,
  },
];

const adminRoutes = [...coreRoutes];
export default adminRoutes;
