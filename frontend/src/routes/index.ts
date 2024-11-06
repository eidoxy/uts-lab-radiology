import { lazy } from "react";

import adminRoutes from "./admin";
import scheduleRoutes from "./schedule";
import pasienRoutes from "./pasien";
import petugasRoutes from "./petugas";
import DokterRoutes from "./dokter";
import PemeriksaanRoutes from "./pemeriksaan";
import HasilRoutes from "./hasilPemeriksaan";
import SpesimenRoutes from "./spesimen";
import LayananRoutes from "./layanan";
import InventarisRoutes from "./inventaris";

const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));
const Settings = lazy(() => import("../pages/Settings"));

const privateRoutes = [
  {
    path: "/admin/dashboard",
    title: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/admin/settings",
    title: "Settings",
    component: Settings,
  },
];

// const publicRoutes = [
// ];

const routes = [
  ...privateRoutes,
  ...adminRoutes,
  ...scheduleRoutes,
  ...pasienRoutes,
  ...petugasRoutes,
  ...DokterRoutes,
  ...PemeriksaanRoutes,
  ...HasilRoutes,
  ...SpesimenRoutes,
  ...LayananRoutes,
  ...InventarisRoutes,
];
export { routes };
