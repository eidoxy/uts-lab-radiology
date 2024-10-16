import { lazy } from "react";

const DokterManagement = lazy(
  () => import("../pages/Admin/Dokter Management")
);
const FormCreateDokter = lazy(
  () => import("../pages/Admin/Dokter Management/FormCreateDokter")
);
const FormEditDokter = lazy(
  () => import("../pages/Admin/Dokter Management/FormEditDokter")
);

const coreRoutes = [
  {
    path: "/admin/dokter-management",
    title: "Dokter Management",
    component: DokterManagement,
  },
  {
    path: "/admin/dokter-management/create",
    title: "Create Dokter",
    component: FormCreateDokter,
  },
  {
    path: "/admin/dokter-management/edit/:id",
    title: "Edit Dokter",
    component: FormEditDokter,
  },
];

const DokterRoutes = [...coreRoutes];
export default DokterRoutes;
