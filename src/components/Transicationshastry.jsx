import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";


import {
  ArrowLeft,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  TrendingUp,
  Search,
  Filter,
  Sparkles,
} from "lucide-react";

function Transicationshastry() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [transactions, setTransactions] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const { data } = await api.get(
        "/api/transaction/history"
      );

      setTransactions(data.history || []);

    } catch (err) {
      console.log(err);

    } finally {
      setLoading(false);
    }
  };

  /* Statistics */

  const totalReceived = useMemo(() => {
  return transactions.reduce((sum, t) => {
    const amount = Number(t.amount) || 0;
    return t.type === "credit" ? sum + amount : sum;
  }, 0);
}, [transactions]);

const totalSent = useMemo(() => {
  return transactions.reduce((sum, t) => {
    const amount = Number(t.amount) || 0;
    return t.type !== "credit" ? sum + amount : sum;
  }, 0);
}, [transactions]);

const filteredTransactions = useMemo(() => {
  const searchValue = String(search || "").toLowerCase();

  return transactions.filter((item) => {
    const phone = String(item.phone || "").toLowerCase();

    const matchesSearch =
      !searchValue || phone.includes(searchValue);

    const matchesFilter =
      filter === "all" || item.type === filter;

    return matchesSearch && matchesFilter;
  });
}, [transactions, search, filter]);
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 mt-10 flex items-center justify-center px-6 py-10">

        <div className="text-center">

          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />

          <p className="mt-5 text-slate-300">
            Loading Transactions...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />

        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[150px] animate-pulse" />

        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[130px]" />

      </div>

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* Back */}

        <button
          onClick={() => navigate(-1)}
          className="mt-10 flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition"
        >
          <ArrowLeft size={18} />

          Back

        </button>

        {/* Heading */}

        <div className="mb-10 text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300">

            <Sparkles size={16} />

            Secure Banking

          </div>

          <h1 className="mt-6 text-5xl font-black">

            Transaction
            <span className="text-indigo-500">
              {" "}
              History
            </span>

          </h1>

          <p className="mt-4 text-slate-400">
            Review every payment, transfer and deposit.
          </p>

        </div>

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

            <Wallet className="text-indigo-400" />

            <p className="mt-5 text-slate-400">
              Total Transactions
            </p>

            <h2 className="mt-2 text-4xl font-black">
              {transactions.length}
            </h2>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

            <ArrowDownLeft className="text-green-400" />

            <p className="mt-5 text-slate-400">
              Money Received
            </p>

            <h2 className="mt-2 text-3xl font-black text-green-400">
              Rs. {totalReceived.toLocaleString()}
            </h2>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

            <TrendingUp className="text-red-400" />

            <p className="mt-5 text-slate-400">
              Money Sent
            </p>

            <h2 className="mt-2 text-3xl font-black text-red-400">
              Rs. {totalSent.toLocaleString()}
            </h2>

          </div>

        </div>

        {/* Search + Filter */}

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

          <div className="grid gap-5 md:grid-cols-2">

            <div className="relative">

              <Search
                size={20}
                className="absolute left-4 top-4 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search by phone..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3 pl-12 pr-4 outline-none focus:border-indigo-500"
              />

            </div>

            <div className="relative">

              <Filter
                size={20}
                className="absolute left-4 top-4 text-slate-400"
              />

              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value)
                }
                className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-900/70 py-3 pl-12 pr-4 outline-none focus:border-indigo-500"
              >
                <option value="all">
                  All Transactions
                </option>

                <option value="credit">
                  Credit
                </option>

                <option value="debit">
                  Debit
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* Transaction List */}

        <div className="mt-8 space-y-5">
                      {filteredTransactions.length === 0 ? (

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl py-20 text-center">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-800">

                <Wallet size={42} className="text-slate-500" />

              </div>

              <h2 className="mt-6 text-2xl font-bold">
                No Transactions Found
              </h2>

              <p className="mt-3 text-slate-400">
                We couldn't find any transactions matching your search.
              </p>

            </div>

          ) : (

            filteredTransactions.map((item) => (

              <div
                key={item._id || item.id}
                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:border-indigo-500/40 hover:bg-white/10 hover:shadow-[0_20px_60px_rgba(79,70,229,.18)]"
              >

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                  {/* Left */}

                  <div className="flex items-center gap-5">

                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-all ${
                        item.type === "credit"
                          ? "bg-green-500/15 text-green-400"
                          : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {item.type === "credit" ? (
                        <ArrowDownLeft size={30} />
                      ) : (
                        <ArrowUpRight size={30} />
                      )}
                    </div>

                    <div>

                      <h3 className="text-xl font-bold capitalize text-white">
                        {item.type}
                      </h3>

                      <p className="mt-1 text-slate-400">
                        {item.phone || "Unknown Number"}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        {new Date(item.date).toLocaleString()}
                      </p>

                    </div>

                  </div>

                  {/* Right */}

                  <div className="text-right">

                    <p
                      className={`text-3xl font-black ${
                        item.type === "credit"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {item.type === "credit" ? "+" : "-"} Rs.{" "}
                      {Number(item.amount).toLocaleString()}
                    </p>

                    <span
                      className={`mt-3 inline-flex rounded-full px-4 py-1 text-xs font-semibold ${
                        item.type === "credit"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {item.type === "credit"
                        ? "Money Received"
                        : "Money Sent"}
                    </span>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

        {/* Footer */}

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

          <h3 className="text-xl font-bold text-white">
            Account Statement
          </h3>

          <p className="mt-3 text-slate-400 leading-7">
            Your transaction history is securely stored and protected.
            Every transfer, deposit, and withdrawal is recorded with its
            amount, type, and timestamp to help you easily review your
            account activity.
          </p>

        </div>

        <div className="mt-8 text-center">

          <p className="text-sm text-slate-500">
            © 2026 AuraBank. Secure Digital Banking.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Transicationshastry;