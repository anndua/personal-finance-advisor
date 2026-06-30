import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authAPI } from "../Services/api";

const Auth = () => {
  const [tab, setTab] = useState("login");
  const navigate = useNavigate();

  const [login, setLogin] = useState({ email: "", password: "" });
  const [register, setRegister] = useState({ name: "", email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await authAPI.login(login);
      // Backend returns 200 with an error message if credentials are wrong
      if (!res.data.access_token) {
        toast.error(res.data.message || "Invalid email or password");
        return;
      }
      localStorage.setItem("token", res.data.access_token);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        "Login failed";
      toast.error(msg);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await authAPI.register(register);
      if (res.data.message !== "User registered successfully") {
        toast.error(res.data.message || "Registration failed");
        return;
      }
      toast.success("Account created — please sign in");
      setTab("login");
    } catch (err) {
      console.error("Register error:", err);
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] bg-brand-600 p-12 text-white">
        <div>
          <span className="text-3xl font-bold tracking-tight">
            Finly<span className="text-gold-400">AI</span>
          </span>
        </div>

        <div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Take control of<br />your finances.
          </h1>
          <p className="text-brand-200 text-lg leading-relaxed">
            Track expenses, set goals, and grow your portfolio — all in one elegant dashboard.
          </p>

          <div className="mt-10 space-y-4">
            {[
              "Real-time expense tracking",
              "Smart financial goals",
              "Portfolio performance analytics",
            ].map((f) => (
              <div key={f} className="flex items-center gap-3 text-brand-100">
                <span className="w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {f}
              </div>
            ))}
          </div>
        </div>

        <p className="text-brand-300 text-sm">© 2025 FinlyAI</p>
      </div>

      {/* Right panel — forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo (mobile) */}
          <div className="lg:hidden mb-8 text-center">
            <span className="text-2xl font-bold text-brand-600">
              Finly<span className="text-gold-500">AI</span>
            </span>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-8">
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  tab === t
                    ? "bg-white text-brand-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Login */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
                <p className="text-slate-500 text-sm mt-1">Sign in to your account</p>
              </div>

              <input
                type="email"
                className="field"
                placeholder="Email address"
                value={login.email}
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
                required
              />

              <input
                type="password"
                className="field"
                placeholder="Password"
                value={login.password}
                onChange={(e) => setLogin({ ...login, password: e.target.value })}
                required
              />

              <button type="submit" className="btn-primary w-full justify-center py-3">
                Sign In
              </button>
            </form>
          )}

          {/* Register */}
          {tab === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Create account</h2>
                <p className="text-slate-500 text-sm mt-1">Start managing your finances today</p>
              </div>

              <input
                className="field"
                placeholder="Full name"
                value={register.name}
                onChange={(e) => setRegister({ ...register, name: e.target.value })}
                required
              />

              <input
                type="email"
                className="field"
                placeholder="Email address"
                value={register.email}
                onChange={(e) => setRegister({ ...register, email: e.target.value })}
                required
              />

              <input
                type="password"
                className="field"
                placeholder="Password"
                value={register.password}
                onChange={(e) => setRegister({ ...register, password: e.target.value })}
                required
              />

              <button type="submit" className="btn-primary w-full justify-center py-3">
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
