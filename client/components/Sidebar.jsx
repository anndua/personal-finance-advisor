import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaMoneyBillWave,
  FaBullseye,
  FaBriefcase,
  FaSignOutAlt
} from "react-icons/fa";

const Sidebar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-[#e6f2f0] text-[#1a6b5e]"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-[#1a6b5e] mb-10">
        FinlyAI
      </h1>

      <nav className="space-y-3">
        <NavLink to="/dashboard" className={linkClass}>
          <FaChartPie />
          Dashboard
        </NavLink>

        <NavLink to="/expenses" className={linkClass}>
          <FaMoneyBillWave />
          Expenses
        </NavLink>

        <NavLink to="/goals" className={linkClass}>
          <FaBullseye />
          Goals
        </NavLink>

        <NavLink to="/portfolio" className={linkClass}>
          <FaBriefcase />
          Portfolio
        </NavLink>
      </nav>

      <button
        onClick={logout}
        className="mt-12 flex items-center gap-3 text-red-500"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;