import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const getUser = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return { name: "User", initial: "U" };
    const payload = JSON.parse(atob(token.split(".")[1]));
    const name = payload.name || payload.sub || "User";
    return { name, initial: name.charAt(0).toUpperCase() };
  } catch {
    return { name: "User", initial: "U" };
  }
};

const Navbar = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const user     = getUser();

  return (
    <header className="bg-white border-b border-slate-100 px-4 md:px-8 py-3 md:py-4
                       flex justify-between items-center shrink-0">
      {/* Left: hamburger (mobile) + search */}
      <div className="flex items-center gap-3">
        {/* Hamburger — only on small screens */}
        <button
          onClick={onMenuToggle}
          className="md:hidden w-9 h-9 rounded-xl bg-slate-50 border border-slate-200
                     flex items-center justify-center text-slate-500 hover:bg-brand-50
                     hover:text-brand-600 hover:border-brand-200 transition"
          aria-label="Toggle menu"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search */}
        <div className="relative w-40 sm:w-56 md:w-72">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 md:py-2.5 text-sm rounded-xl border border-slate-200
                       bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-400
                       focus:border-transparent transition placeholder-slate-400"
          />
        </div>
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notification bell */}
        <button
          className="relative w-9 h-9 rounded-xl bg-slate-50 border border-slate-200
                     flex items-center justify-center text-slate-500 hover:bg-brand-50
                     hover:text-brand-600 hover:border-brand-200 transition"
          aria-label="Notifications"
        >
          <FaBell size={15} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold-500" />
        </button>

        {/* User profile — clickable */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 md:gap-3 group rounded-xl px-2 py-1.5
                     hover:bg-slate-50 transition"
          aria-label="View profile"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-tight group-hover:text-brand-600 transition">
              {user.name}
            </p>
            <p className="text-xs text-slate-400">Personal Finance</p>
          </div>
          <div
            className="w-9 h-9 rounded-xl bg-brand-600 text-white font-semibold text-sm
                       flex items-center justify-center select-none group-hover:bg-brand-700 transition"
          >
            {user.initial}
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
