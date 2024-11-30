import { lazy } from "react";

const LayananManagement = lazy(
  () => import("../pages/Admin/Layanan Management")
);
const FormCreateLayanan = lazy(
  () => import("../pages/Admin/Layanan Management/FormCreateLayanan")
);

const coreRoutes = [
  {
    path: "/admin/layanan-management",
    title: "Layanan Management",
    component: LayananManagement,
  },
  {
    path: "/admin/layanan-management/create",
    title: "Create Layanan",
    component: FormCreateLayanan,
  },
];

const LayananRoutes = [...coreRoutes];
export default LayananRoutes;
