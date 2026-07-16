import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Fingerprint,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await api.post("/api/auth/login", form);

      toast.success(data.message || "Login successful.");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-cyan-500/20 blur-[150px] animate-pulse" />

        <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-purple-500/10 blur-[120px] -translate-x-1/2 -translate-y-1/2" />

      </div>

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">

        <div className="w-full max-w-lg">

          {/* Logo */}

          <div className="text-center mb-8">

            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300">

              <Sparkles size={16} />

              Secure Banking Portal

            </div>

            <h1 className="mt-6 text-5xl font-black">

              Aura
              <span className="text-indigo-500">
                Bank
              </span>

            </h1>

            <p className="mt-4 text-lg text-slate-400">

              Welcome back. Sign in to continue.

            </p>

          </div>

          {/* Card */}

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(79,70,229,.18)]">

            <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">

              <div>

                <h2 className="text-2xl font-bold">
                  Login
                </h2>

                

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500">

                <Fingerprint size={28} />

              </div>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-8"
            >

              {/* Email */}

              <div>

                <label className="text-sm text-slate-300">
                  Email Address
                </label>

                <div className="relative mt-2">

                  <Mail
                    size={20}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3.5 pl-12 pr-4 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                  />

                </div>

              </div>
                            {/* Password */}

              <div>

                <div className="flex items-center justify-between">

                  <label className="text-sm text-slate-300">
                    Password
                  </label>

                  <Link
                    to="/forgotpassword"
                    className="text-sm text-indigo-400 hover:text-indigo-300 transition"
                  >
                    Forgot Password?
                  </Link>

                </div>

                <div className="relative mt-2">

                  <Lock
                    size={20}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3.5 pl-12 pr-14 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-400 hover:text-white transition"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>

              {/* Security Notice */}

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">

                <div className="flex items-start gap-3">

                  <ShieldCheck
                    className="text-emerald-400 mt-0.5"
                    size={22}
                  />

                  <div>

                    <h3 className="font-semibold text-emerald-300">
                      Secure Login
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      Your credentials are protected using encrypted
                      communication. Login verification helps keep your
                      account secure.
                    </p>

                  </div>

                </div>

              </div>

              {/* Login Button */}

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 py-4 font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(79,70,229,.45)] disabled:cursor-not-allowed disabled:opacity-60"
              >

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                <span className="relative flex items-center justify-center gap-2">

                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login
                      <ArrowRight size={18} />
                    </>
                  )}

                </span>

              </button>

            </form>

            {/* Footer */}

            <div className="border-t border-white/10 px-8 py-6">

              <div className="flex items-center justify-between text-sm">

                <p className="text-slate-400">
                  New to AuraBank?
                </p>

                <Link
                  to="/register"
                  className="font-medium text-indigo-400 transition hover:text-indigo-300"
                >
                  Create Account
                </Link>

              </div>

              <div className="mt-6 flex items-center justify-center gap-3 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-3">

                <ShieldCheck
                  size={18}
                  className="text-indigo-400"
                />


              </div>

            </div>

          </div>

          {/* Bottom Footer */}

          <div className="mt-8 text-center text-sm text-slate-500">
            © 2026 AuraBank. Trusted Digital Banking.
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;