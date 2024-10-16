import { lazy } from "react";

import adminRoutes from "./admin";
import authorRoutes from "./author";
import bookRoutes from "./book";
import bookDetailRoutes from "./bookDetail";
import borrowingRoutes from "./borrowing";
import categoryRoutes from "./category";
import memberRoutes from "./member";
import publisherRoutes from "./publisher";
import shelfRoutes from "./shelf";
import stockRoutes from "./stock";
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
const BorrowingBooks = lazy(() => import("../pages/BorrowingBooks"));
const BorrowingDetails = lazy(() => import("../pages/BorrowingDetails"));
const Profile = lazy(() => import("../pages/Member/Profile"));
const Borrowing = lazy(() => import("../pages/Member/MemberBorrowing"));

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

const publicRoutes = [
  {
    path: "/borrowing-books",
    title: "Borrowing Books",
    component: BorrowingBooks,
  },
  {
    path: "/borrowing-detail/:id",
    title: "Borrowing Detail",
    component: BorrowingDetails,
  },
  {
    path: "/profile",
    title: "Profile",
    component: Profile,
  },
  {
    path: "/borrowing",
    title: "Borrowing",
    component: Borrowing,
  },
];

const routes = [
  ...privateRoutes,
  ...adminRoutes,
  ...authorRoutes,
  ...bookRoutes,
  ...bookDetailRoutes,
  ...borrowingRoutes,
  ...categoryRoutes,
  ...memberRoutes,
  ...publisherRoutes,
  ...shelfRoutes,
  ...stockRoutes,
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
export { routes, publicRoutes };
