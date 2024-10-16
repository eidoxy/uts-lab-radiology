import { lazy } from "react";

const InventarisManagement = lazy(
  () => import("../pages/Admin/Inventaris Management")
);
const FormCreateInventaris = lazy(
  () => import("../pages/Admin/Inventaris Management/FormCreateInventaris")
);
const FormEditInventaris = lazy(
  () => import("../pages/Admin/Inventaris Management/FormEditInventaris")
);

const coreRoutes = [
  {
    path: "/admin/Inventaris-management",
    title: "Inventaris Management",
    component: InventarisManagement,
  },
  {
    path: "/admin/Inventaris-management/create",
    title: "Create Inventaris",
    component: FormCreateInventaris,
  },
  {
    path: "/admin/Inventaris-management/edit/:id",
    title: "Edit Inventaris",
    component: FormEditInventaris,
  },
];

const InventarisRoutes = [...coreRoutes];
export default InventarisRoutes;
