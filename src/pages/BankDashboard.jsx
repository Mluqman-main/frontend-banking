import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

import {
    TrendingUp,
 
  Bell,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

import AccountLimit from "../components/accountlimite";
import IncreaseLimit from "../components/requestLimitIncrease";

function BankDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [showBalance, setShowBalance] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [balanceRes, userRes] = await Promise.all([
        api.get("/api/transaction/balance"),
        api.get("/api/auth/me"),
      ]);

      setBalance(balanceRes.data.data.balance);
      setUser(userRes.data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">

        <div className="text-center">

          <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin mx-auto"></div>

          <h2 className="mt-6 text-white text-2xl font-bold">
            Loading Dashboard...
          </h2>

          <p className="text-slate-400 mt-2">
            Please wait while we fetch your account.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white mt-11">

      {/* Animated Background */}

      <div className="absolute inset-0">

        <div className="absolute -top-44 -left-44 w-96 h-96 bg-indigo-600/20 rounded-full blur-[130px] animate-pulse"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px] animate-pulse"></div>

        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>

      </div>

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px,transparent 1px),linear-gradient(90deg,#ffffff 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
                {/* ================= HEADER ================= */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          {/* Left */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">

              <Sparkles size={16} />

              AuraBank Premium Banking

            </div>

            <h1 className="mt-2 text-5xl font-black leading-tight">

              Welcome Back,

              <span className="text-indigo-500">
                {" "}{user.name || "Customer"}
              </span>

            </h1>

            <p className="mt-4 text-slate-400 max-w-2xl">

              Manage your money, monitor transfers,
              apply for loans and keep your finances
              secure from one modern dashboard.

            </p>

          </div>

          {/* Right */}

          <div className="flex items-center gap-4">

            {/* Notification */}

           


            
          </div>

        </div>

        {/* ================= BALANCE CARD ================= */}

        <div className="relative overflow-hidden rounded-[32px]  backdrop-blur-xl border border-white/10 bg-gradient-to-br from-indigo-800/80 via-indigo-800/70 to-indigo-700/60 p-8 shadow-[0_20px_80px_rgba(79,70,229,.35)]">

          {/* Decorative */}

          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />

          <div className="relative z-10">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

              {/* Left */}

              <div>

                <p className="text-indigo-100 text-lg">
                  Available Balance
                </p>

                <div className="mt-4 flex items-center gap-4">

                  <h2 className="text-5xl font-black tracking-tight">

                    {showBalance
                      ? `Rs. ${Number(balance).toLocaleString()}`
                      : "••••••••"}

                  </h2>

                  <button
                    onClick={() =>
                      setShowBalance(!showBalance)
                    }
                    className="rounded-xl bg-white/10 p-3 transition hover:bg-white/20"
                  >

                    {showBalance ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}

                  </button>

                </div>

                <p className="mt-4 text-indigo-100">

                  Your balance is updated automatically
                  after every successful transaction.

                </p>

              </div>

              {/* Right */}

              <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-xl">

                < TrendingUp size={56} onClick={()=>navigate("/transfer")} />

              </div>

            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-xl">

                <p className="text-sm text-indigo-100">
                  Account Holder
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  {user.name}
                </h3>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-xl">

                <p className="text-sm text-indigo-100">
                  Email Address
                </p>

                <h3 className="mt-2 font-semibold break-all">
                  {user.email}
                </h3>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-xl">

                <p className="text-sm text-indigo-100">
                  Phone Number
                </p>

                <h3 className="mt-2 text-xl font-semibold">
                  {user.phone}
                </h3>

              </div>

            </div>

          </div>

        </div>
               

                {/* ================= INSIGHTS SECTION ================= */}

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {/* Virtual Card */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 p-6 text-white shadow-2xl">

            <div className="flex justify-between items-start">

              <div>
                <p className="text-sm opacity-80">
                  AuraBank Card
                </p>
                <h3 className="text-xl font-bold mt-2">
                  {user.name}
                </h3>
              </div>

              <div className="text-xs bg-white/20 px-3 py-1 rounded-full">
                VISA
              </div>

            </div>

            <div className="mt-10 tracking-widest text-lg">
              **** **** **** 4829
            </div>

            <div className="mt-6 flex justify-between text-sm">

              <div>
                <p className="opacity-70">EXP</p>
                <p>09/29</p>
              </div>

              <div>
                <p className="opacity-70">CVV</p>
                <p>***</p>
              </div>

            </div>

          </div>

          {/* Analytics Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <h3 className="text-xl font-bold mb-4">
              Account Insights
            </h3>

            <div className="space-y-4 text-sm text-slate-300">

              <div className="flex justify-between">
                <span>Monthly Activity</span>
                <span className="text-green-400">+12%</span>
              </div>

              <div className="flex justify-between">
                <span>Spending Trend</span>
                <span className="text-red-400">-4%</span>
              </div>

              <div className="flex justify-between">
                <span>Saving Rate</span>
                <span className="text-cyan-400">+8%</span>
              </div>

              <div className="flex justify-between">
                <span>Account Health</span>
                <span className="text-indigo-400">Excellent</span>
              </div>

            </div>

          </div>

        

          {/* Security Status */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <h3 className="text-xl font-bold mb-4">
              Security Status
            </h3>

            <div className="space-y-4">

              <div className="flex items-center justify-between">
                <span>Email Verified</span>
                <span className="text-green-400 font-semibold">Active</span>
              </div>

              <div className="flex items-center justify-between">
                <span>2FA Protection</span>
                <span className="text-green-400 font-semibold">Enabled</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Login Alerts</span>
                <span className="text-green-400 font-semibold">On</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Fraud Detection</span>
                <span className="text-cyan-400 font-semibold">Monitoring</span>
              </div>

            </div>

          </div>

        </div>
                {/* ================= LIMIT + SYSTEM SECTION ================= */}

        
          {/* Increase Limit Component */}
          <div className="rounded-3xl mt-5">

          <AccountLimit />

           

          </div>

          {/* Account Limit Component */}
          <div className="rounded-3xl  ">

         
 <IncreaseLimit />
            

          

        </div>

        {/* ================= SYSTEM INFO ================= */}

        <div className="mt-12 rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-6 backdrop-blur-xl">

          <h2 className="text-xl font-bold mb-3">
            System Notice
          </h2>

          <p className="text-slate-300 leading-7">
            All transactions are secured with end-to-end encryption and real-time fraud monitoring.
            Your account activity is continuously protected by AuraBank security systems.
          </p>

        </div>

      </div>
    </div>
  );
}

export default BankDashboard;