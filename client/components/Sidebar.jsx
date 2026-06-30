import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaMoneyBillWave,
  FaBullseye,
  FaBriefcase,
  FaSignOutAlt,
} from "react-icons/fa";

const links = [
  { to: "/dashboard", label: "Dashboard",  icon: <FaChartPie /> },
  { to: "/expenses",  label: "Expenses",   icon: <FaMoneyBillWave /> },
  { to: "/goals",     label: "Goals",      icon: <FaBullseye /> },
  { to: "/portfolio", label: "Portfolio",  icon: <FaBriefcase /> },
];

const Sidebar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <aside className="w-64 bg-brand-600 min-h-screen flex flex-col py-8 px-5 shrink-0">
      {/* Logo */}
      <div className="mb-10 px-2">
        <span className="text-2xl font-bold text-white tracking-tight">
          Finly<span className="text-gold-400">AI</span>
        </span>
        <p className="text-brand-200 text-xs mt-0.5 font-medium tracking-wide uppercase">
          Finance Advisor
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-brand-200 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <span className="text-base">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                   text-brand-200 hover:bg-white/10 hover:text-white transition-all mt-4"
      >
        <FaSignOutAlt className="text-base" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
