import { lazy } from "react";

const HasilManagement = lazy(
  () => import("../pages/Admin/Hasil Pemeriksaan Management")
);

const coreRoutes = [
  {
    path: "/admin/hasil-pemeriksaan-management",
    title: "Hasil Pemeriksaan",
    component: HasilManagement,
  },
];

const HasilRoutes = [...coreRoutes];
export default HasilRoutes;
