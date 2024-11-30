import { lazy } from "react";

const PetugasManagement = lazy(
  () => import("../pages/Admin/Petugas Management")
);
const FormCreatePetugas = lazy(
  () => import("../pages/Admin/Petugas Management/FormCreatePetugas")
);

const coreRoutes = [
  {
    path: "/admin/petugas-management",
    title: "Petugas Management",
    component: PetugasManagement,
  },
  {
    path: "/admin/petugas-management/create",
    title: "Create Petugas",
    component: FormCreatePetugas,
  },
];

const petugasRoutes = [...coreRoutes];
export default petugasRoutes;
