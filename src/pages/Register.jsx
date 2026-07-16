import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";

import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
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
      const { data } = await api.post("/api/auth/register", form);

      toast.success(data.message || "OTP sent successfully.");

      navigate("/VerifyOtp", {
        state: {
          email: form.email,
        },
      });
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
        err.message ||
        "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Animated Background */}

      <div className="absolute inset-0">

        <div className="absolute -top-40 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[150px] animate-pulse" />

        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

      </div>

      {/* Small Grid */}

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px),linear-gradient(90deg,#ffffff 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">

        <div className="w-full max-w-lg">

          {/* Logo */}

          <div className="text-center mb-8">

            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-5 py-2 rounded-full text-indigo-300 text-sm">

              <Sparkles size={16} />

              Next Generation Banking

            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight">

              Aura
              <span className="text-indigo-500">
                Bank
              </span>

            </h1>

            <p className="text-slate-400 mt-4 text-lg">

              Create your secure digital banking account.

            </p>

          </div>

          {/* Card */}

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(79,70,229,0.18)] overflow-hidden">

            {/* Top Bar */}

            <div className="border-b border-white/10 px-8 py-6 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold">

                  Create Account

                </h2>

                <p className="text-slate-400 text-sm mt-1">

                  Secure registration with email verification.

                </p>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-xl">

                <ShieldCheck size={28} />

              </div>

            </div>

            <form
              onSubmit={handleSubmit}
              className="p-8 space-y-6"
            >

              {/* Name */}

              <div>

                <label className="text-sm text-slate-300">

                  Full Name

                </label>

                <div className="relative mt-2">

                  <User
                    size={20}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Muhammad Luqman"
                    className="w-full bg-slate-900/70 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all"
                  />

                </div>

              </div>

              {/* Phone */}

              <div>

                <label className="text-sm text-slate-300">

                  Phone Number

                </label>

                <div className="relative mt-2">

                  <Phone
                    size={20}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <input
                    type="number"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="03XXXXXXXXX"
                    className="w-full bg-slate-900/70 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all"
                  />

                </div>

              </div>
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
                    className="w-full bg-slate-900/70 border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <label className="text-sm text-slate-300">
                  Password
                </label>

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
                    placeholder="Enter a strong password"
                    className="w-full bg-slate-900/70 border border-slate-700 rounded-xl py-3.5 pl-12 pr-14 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-3.5 text-slate-400 hover:text-white transition"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Use at least 8 characters including
                  uppercase, lowercase and numbers.
                </p>

              </div>

              {/* Security Card */}

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 flex items-start gap-4">

                <div className="bg-emerald-500/20 rounded-xl p-2">

                  <ShieldCheck
                    size={22}
                    className="text-emerald-400"
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-emerald-300">
                    Secure Registration
                  </h3>

                  <p className="text-sm text-slate-300 mt-1 leading-6">
                    Your account will be protected using
                    encrypted communication and verified
                    through a one-time password (OTP).
                  </p>

                </div>

              </div>

              {/* Register Button */}

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 py-4 font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(79,70,229,.45)] disabled:opacity-60 disabled:cursor-not-allowed"
              >

                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <span className="relative flex items-center justify-center gap-2">

                  {loading ? (
                    <>
                      <div className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={18} />
                    </>
                  )}

                </span>

              </button>

            </form>

            {/* Footer */}

            <div className="border-t border-white/10 px-8 py-6">

              <div className="flex justify-between text-sm">

                <p className="text-slate-400">

                  Already have an account?

                  <Link
                    to="/login"
                    className="ml-2 font-medium text-indigo-400 hover:text-indigo-300 transition"
                  >
                    Login
                  </Link>

                </p>

                <Link
                  to="/forgotpassword"
                  className="text-slate-400 hover:text-white transition"
                >
                  Forgot Password?
                </Link>

              </div>

              <div className="mt-6 flex items-center justify-center gap-3 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-3">

                <ShieldCheck
                  size={18}
                  className="text-indigo-400"
                />

                <span className="text-sm text-slate-300">
                  Protected with bank-grade security and
                  encrypted data transmission.
                </span>

              </div>

            </div>

          </div>

          {/* Bottom Text */}

          <div className="mt-8 text-center text-sm text-slate-500">

            © 2026 AuraBank. Secure Digital Banking Experience.

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;