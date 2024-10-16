import { lazy } from "react";

const HasilManagement = lazy(
  () => import("../pages/Admin/Hasil Pemeriksaan Management")
);
const FormCreateHasil = lazy(
  () => import("../pages/Admin/Hasil Pemeriksaan Management/FormCreateHasil")
);
const FormEditHasil = lazy(
  () => import("../pages/Admin/Hasil Pemeriksaan Management/FormEditHasil")
);

const coreRoutes = [
  {
    path: "/admin/Hasil-pemeriksaan-management",
    title: "Hasil Pemeriksaan",
    component: HasilManagement,
  },
  {
    path: "/admin/Hasil-pemeriksaan-management/create",
    title: "Create Hasil Pemeriksaan",
    component: FormCreateHasil,
  },
  {
    path: "/admin/Hasil-pemeriksaan-management/edit/:id",
    title: "Edit Hasil Pemeriksaan",
    component: FormEditHasil,
  },
];

const HasilRoutes = [...coreRoutes];
export default HasilRoutes;
