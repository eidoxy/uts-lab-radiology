import { lazy } from "react";

const LayananManagement = lazy(
  () => import("../pages/Admin/Layanan Management")
);
const FormCreateLayanan = lazy(
  () => import("../pages/Admin/Layanan Management/FormCreateLayanan")
);
const FormEditLayanan = lazy(
  () => import("../pages/Admin/Layanan Management/FormEditLayanan")
);

const coreRoutes = [
  {
    path: "/admin/Layanan-management",
    title: "Layanan Management",
    component: LayananManagement,
  },
  {
    path: "/admin/Layanan-management/create",
    title: "Create Layanan",
    component: FormCreateLayanan,
  },
  {
    path: "/admin/Layanan-management/edit/:id",
    title: "Edit Layanan",
    component: FormEditLayanan,
  },
];

const LayananRoutes = [...coreRoutes];
export default LayananRoutes;
