import { useState } from "react";
import { authAPI } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [tab, setTab] = useState("login");
  const navigate = useNavigate();

  // LOGIN
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  // REGISTER
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  // LOGIN HANDLER
  const handleLogin = async () => {
    try {
      const res = await authAPI.login(login);

      localStorage.setItem("token", res.data.access_token);

      toast.success("Login successful");

      navigate("/dashboard");

    } catch {
      toast.error("Invalid credentials");
    }
  };

  // REGISTER HANDLER
  const handleRegister = async () => {
    try {
      await authAPI.register(register);

      toast.success("Account created");

      setTab("login");

    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f9fb]">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Tabs */}
        <div className="grid grid-cols-2">
          <button
            onClick={() => setTab("login")}
            className={`p-4 font-semibold ${
              tab === "login"
                ? "bg-[#1a6b5e] text-white"
                : "bg-gray-100"
            }`}
          >
            Sign In
          </button>

          <button
            onClick={() => setTab("register")}
            className={`p-4 font-semibold ${
              tab === "register"
                ? "bg-[#1a6b5e] text-white"
                : "bg-gray-100"
            }`}
          >
            Register
          </button>
        </div>

        <div className="p-6 space-y-4">

          {/* LOGIN FORM */}
          {tab === "login" && (
            <>
              <h2 className="text-2xl font-bold">
                Welcome Back
              </h2>

              <input
                className="w-full border p-3 rounded-xl"
                placeholder="Email"
                onChange={(e) =>
                  setLogin({
                    ...login,
                    email: e.target.value,
                  })
                }
              />

              <input
                type="password"
                className="w-full border p-3 rounded-xl"
                placeholder="Password"
                onChange={(e) =>
                  setLogin({
                    ...login,
                    password: e.target.value,
                  })
                }
              />

              <button
                onClick={handleLogin}
                className="w-full bg-[#1a6b5e] text-white p-3 rounded-xl"
              >
                Login
              </button>
            </>
          )}

          {/* REGISTER FORM */}
          {tab === "register" && (
            <>
              <h2 className="text-2xl font-bold">
                Create Account
              </h2>

              <input
                className="w-full border p-3 rounded-xl"
                placeholder="Full Name"
                onChange={(e) =>
                  setRegister({
                    ...register,
                    name: e.target.value,
                  })
                }
              />

              <input
                className="w-full border p-3 rounded-xl"
                placeholder="Email"
                onChange={(e) =>
                  setRegister({
                    ...register,
                    email: e.target.value,
                  })
                }
              />

              <input
                type="password"
                className="w-full border p-3 rounded-xl"
                placeholder="Password"
                onChange={(e) =>
                  setRegister({
                    ...register,
                    password: e.target.value,
                  })
                }
              />

              <button
                onClick={handleRegister}
                className="w-full bg-[#1a6b5e] text-white p-3 rounded-xl"
              >
                Register
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default Auth;