import React, { useEffect, useState } from "react";
import api from "../api/api"; 
import { useNavigate } from "react-router-dom";
import BackButton from "./Backbutton";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ShieldCheck,
  Activity,
  Sparkles,
} from "lucide-react";

function AccountLimit() {
  const [limit, setLimit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getLimit = async () => {
    try {
      if (!loading) setRefreshing(true);

      const res = await api.get("/api/auth/getTransferLimit");

      setLimit(res.data.data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to load transfer limit."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getLimit();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto" />

          <p className="text-slate-400 mt-6">
            Loading Account Limit...
          </p>

        </div>

      </div>
    );
  }

  const percent =
    limit.accountLimit > 0
      ? (limit.usedLimit / limit.accountLimit) * 100
      : 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />

        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[130px] animate-pulse" />

        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px]" />

      </div>

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300">

              <Sparkles size={15} />

              AuraBank Secure Transfer

            </div>

            <h1 className="mt-5 text-5xl font-black">

              Transfer
              <span className="text-indigo-500">
                {" "}Limit
              </span>

            </h1>

            <p className="mt-3 text-slate-400">

              Monitor your daily transfer usage and remaining balance.

            </p>

          </div>

          <button
            onClick={getLimit}
            disabled={refreshing}
            className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3 font-semibold transition hover:scale-105 hover:shadow-[0_15px_40px_rgba(79,70,229,.35)] disabled:opacity-60"
          >

            <RefreshCw
              size={18}
              className={refreshing ? "animate-spin" : ""}
            />

            {refreshing ? "Refreshing..." : "Refresh"}

          </button>

        </div>

        {/* Overview */}

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(79,70,229,.18)] p-8">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold">
                Account Overview
              </h2>

              <p className="text-slate-400 mt-2">
                Current transfer limit statistics
              </p>

            </div>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center">

              <Wallet size={36} />

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Total */}

            <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-6">

              <div className="flex items-center gap-3 mb-4">

                <Wallet className="text-indigo-400" />

                <span className="text-slate-400">
                  Account Limit
                </span>

              </div>

              <h2 className="text-3xl font-black text-indigo-400">

                Rs. {Number(limit.accountLimit).toLocaleString()}

              </h2>

            </div>

            {/* Used */}

            <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-6">

              <div className="flex items-center gap-3 mb-4">

                <TrendingDown className="text-red-400" />

                <span className="text-slate-400">
                  Used Limit
                </span>

              </div>

              <h2 className="text-3xl font-black text-red-400">

                Rs. {Number(limit.usedLimit).toLocaleString()}

              </h2>

            </div>

            {/* Remaining */}

            <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-6">

              <div className="flex items-center gap-3 mb-4">

                <TrendingUp className="text-green-400" />

                <span className="text-slate-400">
                  Remaining
                </span>

              </div>

              <h2 className="text-3xl font-black text-green-400">

                Rs. {Number(limit.remainingLimit).toLocaleString()}

              </h2>

            </div>

          </div>
                    {/* Usage Progress */}

          <div className="mt-10">

            <div className="flex justify-between items-center mb-3">

              <div className="flex items-center gap-2">

                <Activity className="text-cyan-400" size={20} />

                <span className="font-semibold">
                  Daily Usage
                </span>

              </div>

              <span className="font-bold text-lg">
                {percent.toFixed(1)}%
              </span>

            </div>

            <div className="h-5 w-full overflow-hidden rounded-full bg-slate-800">

              <div
                style={{ width: `${percent}%` }}
                className={`h-full rounded-full transition-all duration-1000 ${
                  percent >= 90
                    ? "bg-gradient-to-r from-red-500 to-red-400"
                    : percent >= 60
                    ? "bg-gradient-to-r from-yellow-500 to-orange-400"
                    : "bg-gradient-to-r from-green-500 to-cyan-400"
                }`}
              />

            </div>

          </div>

          {/* Status */}

          <div className="grid gap-6 mt-10 md:grid-cols-2">

            <div
              className={`rounded-2xl border p-6 ${
                percent >= 90
                  ? "border-red-500/30 bg-red-500/10"
                  : percent >= 60
                  ? "border-yellow-500/30 bg-yellow-500/10"
                  : "border-green-500/30 bg-green-500/10"
              }`}
            >

              <h3 className="text-xl font-bold mb-3">
                Usage Status
              </h3>

              {percent >= 90 ? (
                <p className="text-red-300 leading-7">
                  Your account has almost reached its transfer limit.
                  Consider requesting a higher limit before making
                  additional transfers.
                </p>
              ) : percent >= 60 ? (
                <p className="text-yellow-300 leading-7">
                  You have used more than half of your transfer
                  allowance today. Monitor your remaining limit.
                </p>
              ) : (
                <p className="text-green-300 leading-7">
                  Your account is operating within a healthy transfer
                  range and sufficient limit remains available.
                </p>
              )}

            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">

              <div className="flex items-center gap-3 mb-4">

                <ShieldCheck className="text-emerald-400" />

                <h3 className="text-xl font-bold">
                  Secure Transfers
                </h3>

              </div>

              <p className="text-slate-300 leading-7">
                Every transaction is protected with secure authentication,
                encrypted communication, and fraud monitoring to help keep
                your account safe.
              </p>

            </div>

          </div>

          {/* Warning */}

          {limit.remainingLimit <= 0 && (

            <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">

              <h3 className="text-2xl font-bold text-red-300">
                Transfer Limit Reached
              </h3>

              <p className="mt-3 text-slate-300">
                You have reached your available transfer limit.
                Increase your account limit or wait until your limit
                resets before sending additional transfers.
              </p>

            </div>

          )}

          {/* Information */}

          <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/50 p-6">

            <h3 className="text-xl font-bold mb-5">
              Transfer Limit Information
            </h3>

            <ul className="space-y-3 text-slate-400 leading-7">

              <li>
                • Your available limit updates automatically after every successful transfer.
              </li>

              <li>
                • Used transfer amounts cannot be recovered until the limit resets.
              </li>

              <li>
                • Limit increase requests are subject to verification and approval.
              </li>

              <li>
                • Refresh this page anytime to retrieve the latest account information.
              </li>

            </ul>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-10 text-center">

          <p className="text-sm text-slate-500">
            © 2026 AuraBank • Secure Digital Banking Platform
          </p>

        </div>

      </div>

    </div>
  );
}

export default AccountLimit;