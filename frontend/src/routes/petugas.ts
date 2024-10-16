import { lazy } from "react";

const PetugasManagement = lazy(
  () => import("../pages/Admin/Petugas Management")
);
const FormCreatePetugas = lazy(
  () => import("../pages/Admin/Petugas Management/FormCreatePetugas")
);
const FormEditPetugas = lazy(
  () => import("../pages/Admin/Petugas Management/FormEditPetugas")
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
  {
    path: "/admin/petugas-management/edit/:id",
    title: "Edit Petugas",
    component: FormEditPetugas,
  },
];

const petugasRoutes = [...coreRoutes];
export default petugasRoutes;
