import { lazy } from "react";

const PasienManagement = lazy(
  () => import("../pages/Admin/Pasien Management")
);
const FormCreatePasien = lazy(
  () => import("../pages/Admin/Pasien Management/FormCreatePasien")
);
const FormEditPasien = lazy(
  () => import("../pages/Admin/Pasien Management/FormEditPasien")
);

const coreRoutes = [
  {
    path: "/admin/pasien-management",
    title: "Pasien Management",
    component: PasienManagement,
  },
  {
    path: "/admin/pasien-management/create",
    title: "Create Pasien",
    component: FormCreatePasien,
  },
  {
    path: "/admin/pasien-management/edit/:id",
    title: "Edit Pasien",
    component: FormEditPasien,
  },
];

const pasienRoutes = [...coreRoutes];
export default pasienRoutes;
