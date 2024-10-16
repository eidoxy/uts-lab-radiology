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
    path: "/admin/spesimen-management",
    title: "Spesimen Management",
    component: SpesimenManagement,
  },
  {
    path: "/admin/spesimen-management/create",
    title: "Create Spesimen",
    component: FormCreateSpesimen,
  },
  {
    path: "/admin/spesimen-management/edit/:id",
    title: "Edit Spesimen",
    component: FormEditSpesimen,
  },
];

const SpesimenRoutes = [...coreRoutes];
export default SpesimenRoutes;
