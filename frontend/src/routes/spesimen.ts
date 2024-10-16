import { lazy } from "react";

const SpesimenManagement = lazy(
  () => import("../pages/Admin/Spesimen Management")
);
const FormCreateSpesimen = lazy(
  () => import("../pages/Admin/Spesimen Management/FormCreateSpesimen")
);
const FormEditSpesimen = lazy(
  () => import("../pages/Admin/Spesimen Management/FormEditSpesimen")
);

const coreRoutes = [
  {
    path: "/admin/Spesimen-management",
    title: "Spesimen Management",
    component: SpesimenManagement,
  },
  {
    path: "/admin/Spesimen-management/create",
    title: "Create Spesimen",
    component: FormCreateSpesimen,
  },
  {
    path: "/admin/Spesimen-management/edit/:id",
    title: "Edit Spesimen",
    component: FormEditSpesimen,
  },
];

const SpesimenRoutes = [...coreRoutes];
export default SpesimenRoutes;
