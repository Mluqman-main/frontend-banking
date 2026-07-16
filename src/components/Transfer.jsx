import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { v4 as uuidv4 } from "uuid";

import {
  ArrowLeft,
  Smartphone,
  Wallet,
  Send,
  Loader2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

function Transfer() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    toAccount: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.toAccount || !formData.amount) {
      return setError("Please fill in all fields.");
    }

    if (Number(formData.amount) <= 0) {
      return setError("Amount must be greater than zero.");
    }

    try {
      setLoading(true);

      const idempotencyKey = uuidv4();

      const { data } = await api.post(
        "/api/transaction/transfer",
        {
          toAccount: formData.toAccount,
          amount: Number(formData.amount),
          idempotencyKey,
        }
      );

      setMessage(
        data.message || "Transfer Successful."
      );

      setFormData({
        toAccount: "",
        amount: "",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Transfer failed."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />

        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[150px] animate-pulse" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px]" />

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

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">

        <div className="w-full max-w-2xl">

          {/* Back */}

          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          {/* Heading */}

          <div className="mb-8 text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300">

              <Sparkles size={16} />

              Secure Money Transfer

            </div>

            <h1 className="mt-6 text-5xl font-black">

              Send
              <span className="text-indigo-500">
                {" "}Money
              </span>

            </h1>

            <p className="mt-4 text-slate-400">
              Fast, secure and encrypted bank transfers.
            </p>

          </div>

          {/* Card */}

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(79,70,229,.18)]">

            <div className="border-b border-white/10 px-8 py-6">

              <h2 className="text-2xl font-bold">
                Transfer Details
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Enter the receiver information below.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-8"
            >

              {/* Success */}

              {message && (
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-green-300">
                  {message}
                </div>
              )}

              {/* Error */}

              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
                  {error}
                </div>
              )}

              {/* Phone */}

              <div>

                <label className="mb-2 block text-sm text-slate-300">
                  Receiver Phone Number
                </label>

                <div className="relative">

                  <Smartphone
                    size={20}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <input
                    type="text"
                    name="toAccount"
                    value={formData.toAccount}
                    onChange={handleChange}
                    placeholder="03XXXXXXXXX"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3.5 pl-12 pr-4 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                  />

                </div>

              </div>

              {/* Amount */}

              <div>

                <label className="mb-2 block text-sm text-slate-300">
                  Amount
                </label>

                <div className="relative">

                  <Wallet
                    size={20}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <span className="absolute left-12 top-3.5 text-slate-400">
                    Rs.
                  </span>

                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="1000"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3.5 pl-20 pr-4 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                  />

                </div>

              </div>
                            {/* Transfer Summary */}

              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-6">

                <h3 className="text-lg font-semibold text-white">
                  Transfer Summary
                </h3>

                <div className="mt-5 space-y-4">

                  <div className="flex items-center justify-between">

                    <span className="text-slate-400">
                      Receiver
                    </span>

                    <span className="font-medium text-white">
                      {formData.toAccount || "--"}
                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-slate-400">
                      Amount
                    </span>

                    <span className="text-xl font-bold text-indigo-400">
                      Rs.{" "}
                      {formData.amount
                        ? Number(formData.amount).toLocaleString()
                        : "0"}
                    </span>

                  </div>

                </div>

              </div>

              {/* Security */}

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">

                <h3 className="text-lg font-semibold text-emerald-300">
                  Secure Transaction
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Every transfer is encrypted and protected with a unique
                  idempotency key to prevent duplicate transactions.
                </p>

              </div>

              {/* Button */}

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 py-4 font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(79,70,229,.45)] disabled:cursor-not-allowed disabled:opacity-60"
              >

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                <span className="relative flex items-center justify-center gap-2">

                  {loading ? (
                    <>
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />
                      Processing Transfer...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Transfer Money
                      <ArrowRight size={18} />
                    </>
                  )}

                </span>

              </button>

            </form>

            {/* Footer Information */}

            <div className="border-t border-white/10 bg-slate-900/30 px-8 py-6">

              <h3 className="text-lg font-semibold text-white">
                Transaction Information
              </h3>

              <ul className="mt-4 space-y-3 text-sm text-slate-400">

                <li>
                  • Transfers are processed using the receiver's registered
                  phone number.
                </li>

                <li>
                  • Every request generates a unique idempotency key to prevent
                  duplicate transfers.
                </li>

                <li>
                  • Your account balance is updated automatically after a
                  successful transaction.
                </li>

                <li>
                  • If a transfer fails, no amount will be deducted.
                </li>

              </ul>

            </div>

          </div>

          {/* Footer */}

          <div className="mt-8 text-center">

            <p className="text-sm text-slate-500">
              © 2026 AuraBank. Secure Digital Banking.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Transfer;