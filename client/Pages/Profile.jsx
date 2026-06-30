import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  FaUser,
  FaEnvelope,
  FaSignOutAlt,
  FaShieldAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const getUser = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return { name: "User", email: "", initial: "U", sub: "" };
    const payload = JSON.parse(atob(token.split(".")[1]));
    const name    = payload.name  || payload.sub || "User";
    const email   = payload.email || payload.sub || "";
    const exp     = payload.exp
      ? new Date(payload.exp * 1000).toLocaleDateString("en-IN", {
          day: "numeric", month: "long", year: "numeric",
        })
      : null;
    return {
      name,
      email,
      initial: name.charAt(0).toUpperCase(),
      exp,
    };
  } catch {
    return { name: "User", email: "", initial: "U", exp: null };
  }
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 py-4 border-b border-slate-100 last:border-0">
    <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="text-sm font-semibold text-slate-700">{value || "—"}</p>
    </div>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const user     = getUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">Profile</h1>
        <p className="text-slate-500 text-sm mt-1">Your account information</p>
      </div>

      <div className="max-w-xl mx-auto space-y-5">
        {/* Avatar card */}
        <div className="card flex flex-col items-center py-10">
          <div
            className="w-20 h-20 rounded-2xl bg-brand-600 text-white font-bold text-3xl
                       flex items-center justify-center shadow-lg mb-4"
          >
            {user.initial}
          </div>
          <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
          {user.email && (
            <p className="text-slate-400 text-sm mt-1">{user.email}</p>
          )}
          <span className="mt-3 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold">
            Personal Finance
          </span>
        </div>

        {/* Info card */}
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Account Details
          </h3>
          <InfoRow icon={<FaUser size={14} />}        label="Full Name"    value={user.name} />
          <InfoRow icon={<FaEnvelope size={14} />}    label="Email"        value={user.email} />
          <InfoRow icon={<FaShieldAlt size={14} />}   label="Account Type" value="Personal" />
          {user.exp && (
            <InfoRow
              icon={<FaCalendarAlt size={14} />}
              label="Session Expires"
              value={user.exp}
            />
          )}
        </div>

        {/* Logout card */}
        <div className="card">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                       bg-red-50 text-red-600 hover:bg-red-100 font-semibold text-sm
                       transition-colors"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
