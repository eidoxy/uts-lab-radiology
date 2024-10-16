import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";

import iconDashboard from "../images/icons/icon-dashboard.svg";
import iconSchedule from "../images/icons/icon-schedule.svg";
import iconCalendar from "../images/icons/icon-calendar.svg";
import iconDokter from "../images/icons/icon-dokter.svg";
import iconLayanan from "../images/icons/icon-layanan.svg";
import iconPasien from "../images/icons/icon-pasien.svg";
import iconPetugas from "../images/icons/icon-petugas.svg";
import iconSpesimen from "../images/icons/icon-spesimen.svg";
import iconPemeriksaan from "../images/icons/icon-pemeriksaan.svg";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null
      ? false
      : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-primary duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <div className="flex items-center justify-center">
            <h1 className="font-bold text-4xl">
              <span className="text-white">RADIOLABS</span>
            </h1>
          </div>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white">
              MENU
            </h3>
            <hr className="my-6 border-gray dark:border-meta-4" />
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes("dashboard") &&
                    "bg-primary-dark dark:bg-meta-4"
                  }`}
                >
                  <img src={iconDashboard} alt="Dashboard" />
                  Dashboard
                </NavLink>
              </li>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Request Schedule --> */}
              <li>
                <NavLink
                  to="/admin/schedule-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes("schedule-management") &&
                    "bg-primary-dark dark:bg-meta-4"
                  }`}
                >
                  <img src={iconCalendar} alt="Schedule" />
                  Schedule
                </NavLink>
              </li>
              {/* <!-- Menu Request Schedule --> */}

              {/* <!-- Menu Pasien --> */}
              <li>
                <NavLink
                  to="/admin/pasien-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes("pasien-management") &&
                    "bg-primary-dark dark:bg-meta-4"
                  }`}
                >
                  <img src={iconPasien} alt="Pasien" />
                  Pasien
                </NavLink>
              </li>
              {/* <!-- Menu Pasien --> */}

              {/* <!-- Menu Petugas --> */}
              <li>
                <NavLink
                  to="/admin/petugas-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes("petugas-management") &&
                    "bg-primary-dark dark:bg-meta-4"
                  }`}
                >
                  <img src={iconPetugas} alt="Petugas" />
                  Petugas
                </NavLink>
              </li>
              {/* <!-- Menu Petugas --> */}

              {/* <!-- Menu Dokter --> */}
              <li>
                <NavLink
                  to="/admin/dokter-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes("dokter-management") &&
                    "bg-primary-dark dark:bg-meta-4"
                  }`}
                >
                  <img src={iconDokter} alt="Dokter" />
                  Dokter
                </NavLink>
              </li>
              {/* <!-- Menu Dokter --> */}

              {/* <!-- Menu Pemeriksaan --> */}
              <li>
                <NavLink
                  to="/admin/pemeriksaan-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes("pemeriksaan-management") &&
                    "bg-primary-dark dark:bg-meta-4"
                  }`}
                >
                  <img src={iconPemeriksaan} alt="Jadwal" />
                  Pemeriksaan
                </NavLink>
              </li>
              {/* <!-- Menu Pemeriksaan --> */}

              {/* <!-- Menu Request Schedule --> */}
              {/* <li>
                <NavLink
                  to="/admin/Hasil-Pemeriksaan-Management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes("Hasil-Pemeriksaan-Management") &&
                    "bg-primary-dark dark:bg-meta-4"
                  }`}
                >
                  <img src={iconSchedule} alt="Hasil Pemeriksaan" />
                  Hasil Pemeriksaan
                </NavLink>
              </li> */}
              {/* <!-- Menu Request Schedule --> */}

              {/* <!-- Menu Spesimen --> */}
              <li>
                <NavLink
                  to="/admin/spesimen-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes("spesimen-management") &&
                    "bg-primary-dark dark:bg-meta-4"
                  }`}
                >
                  <img src={iconSpesimen} alt="Spesimen" />
                  Spesimen
                </NavLink>
              </li>
              {/* <!-- Menu Spesimen --> */}

              {/* <!-- Menu Layanan --> */}
              <li>
                <NavLink
                  to="/admin/layanan-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes("layanan-management") &&
                    "bg-primary-dark dark:bg-meta-4"
                  }`}
                >
                  <img src={iconLayanan} alt="Layanan" />
                  Layanan
                </NavLink>
              </li>
              {/* <!-- Menu Layanan --> */}

              {/* <!-- Menu Request Schedule --> */}
              {/* <li>
                <NavLink
                  to="/admin/Inventaris-management"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-primary-dark dark:hover:bg-meta-4 ${
                    pathname.includes("Inventaris-management") &&
                    "bg-primary-dark dark:bg-meta-4"
                  }`}
                >
                  <img src={iconSchedule} alt="Inventaris" />
                  Inventaris
                </NavLink>
              </li> */}
              {/* <!-- Menu Request Schedule --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
