import { lazy } from "react";

const SpesimenManagement = lazy(
  () => import("../pages/Admin/Spesimen Management")
);
const FormCreateSpesimen = lazy(
  () => import("../pages/Admin/Spesimen Management/FormCreateSpesimen")
);

const coreRoutes = [
  {
    path: "/admin/spesimen-management",
    title: "Spesimen Management",
    component: SpesimenManagement,
  },
  {
    path: "/admin/spesimen-management/create",
    title: "Create Spesimen",
    component: FormCreateSpesimen,
  },
];

const SpesimenRoutes = [...coreRoutes];
export default SpesimenRoutes;
