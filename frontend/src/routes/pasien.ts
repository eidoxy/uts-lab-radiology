import { lazy } from "react";

const PasienManagement = lazy(
  () => import("../pages/Admin/Pasien Management")
);
const FormCreatePasien = lazy(
  () => import("../pages/Admin/Pasien Management/FormCreatePasien")
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
];

const pasienRoutes = [...coreRoutes];
export default pasienRoutes;
