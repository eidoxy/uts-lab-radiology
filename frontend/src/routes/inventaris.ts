import { lazy } from "react";

const InventarisManagement = lazy(
  () => import("../pages/Admin/Inventaris Management")
);

const coreRoutes = [
  {
    path: "/admin/inventaris-management",
    title: "Inventaris Management",
    component: InventarisManagement,
  },
];

const InventarisRoutes = [...coreRoutes];
export default InventarisRoutes;
