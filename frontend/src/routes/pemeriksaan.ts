import { lazy } from "react";

const PemeriksaanManagement = lazy(
  () => import("../pages/Admin/Pemeriksaan Management")
);
const FormCreatePemeriksaan = lazy(
  () => import("../pages/Admin/Pemeriksaan Management/FormCreatePemeriksaan")
);

const coreRoutes = [
  {
    path: "/admin/pemeriksaan-management",
    title: "Pemeriksaan Management",
    component: PemeriksaanManagement,
  },
  {
    path: "/admin/pemeriksaan-management/create",
    title: "Create Pemeriksaan",
    component: FormCreatePemeriksaan,
  },
];

const PemeriksaanRoutes = [...coreRoutes];
export default PemeriksaanRoutes;
