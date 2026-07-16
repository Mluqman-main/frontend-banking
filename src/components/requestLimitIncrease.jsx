import React, { useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";

import {
  ShieldCheck,
  WalletCards,
  BadgeCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

function IncreaseLimit() {
  const [loading, setLoading] = useState(false);

  const [selectedLimit, setSelectedLimit] =
    useState(50000);

  const limitOptions = [
    {
      title: "Standard",
      amount: "Rs. 50,000",
      value: 50000,
      description:
        "Suitable for everyday personal banking.",
    },
    {
      title: "Premium",
      amount: "Rs. 150,000",
      value: 150000,
      description:
        "Ideal for business and high-value transfers.",
    },
    {
      title: "Enterprise",
      amount: "Rs. 2,020,000",
      value: 2020000,
      description:
        "Maximum transfer limit with bank approval.",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post(
        "/api/auth/requestLimitIncrease",
        {
          newLimit: selectedLimit,
        }
      );

      toast.success(res.data.message);
    } catch (err) { 
      toast.error(
        err.response?.data?.message ||
          "Something went wrong."
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
            "linear-gradient(#fff 1px, transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">

        <div className="w-full max-w-3xl">

          {/* Heading */}

          <div className="mb-8 text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300">

              <Sparkles size={16} />

              Premium Banking

            </div>

            <h1 className="mt-6 text-5xl font-black">

              Increase
              <span className="text-indigo-500">
                {" "}
                Transfer Limit
              </span>

            </h1>

            <p className="mt-4 text-slate-400">

              Upgrade your daily transfer limit securely.

            </p>

          </div>

          {/* Card */}

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(79,70,229,.18)]">

            <div className="border-b border-white/10 px-8 py-6">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    Choose Your Limit
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Select your preferred transfer limit.
                  </p>

                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500">

                  <WalletCards size={30} />

                </div>

              </div>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-8"
            >

              {limitOptions.map((option) => (

                <label
                  key={option.value}
                  className={`block cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                    selectedLimit === option.value
                      ? "border-indigo-500 bg-indigo-500/10 shadow-lg"
                      : "border-slate-700 bg-slate-900/60 hover:border-indigo-500"
                  }`}
                >

                  <input
                    type="radio"
                    className="hidden"
                    checked={
                      selectedLimit === option.value
                    }
                    onChange={() =>
                      setSelectedLimit(option.value)
                    }
                  />

                  <div className="flex items-center justify-between">

                    <div>

                      <div className="flex items-center gap-2">

                        <BadgeCheck
                          size={18}
                          className="text-indigo-400"
                        />

                        <h3 className="text-xl font-bold">

                          {option.title}

                        </h3>

                      </div>

                      <p className="mt-2 text-sm text-slate-400">

                        {option.description}

                      </p>

                    </div>

                    <h2 className="text-2xl font-bold text-indigo-400">

                      {option.amount}

                    </h2>

                  </div>

                </label>

              ))}
                            {/* Selected Limit Summary */}

              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-6">

                <p className="text-sm text-slate-400">
                  Selected Transfer Limit
                </p>

                <h2 className="mt-2 text-4xl font-black text-white">
                  Rs. {selectedLimit.toLocaleString()}
                </h2>

                <p className="mt-3 text-sm text-slate-300">
                  Once approved, this will become your new maximum daily
                  transfer limit.
                </p>

              </div>

              {/* Security Card */}

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">

                <div className="flex items-start gap-4">

                  <ShieldCheck
                    size={24}
                    className="mt-1 text-emerald-400"
                  />

                  <div>

                    <h3 className="text-lg font-semibold text-emerald-300">
                      Secure Verification
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Every transfer limit increase request is securely
                      reviewed by the bank. Additional verification may be
                      required before approval.
                    </p>

                  </div>

                </div>

              </div>

              {/* Submit Button */}

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 py-4 font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(79,70,229,.45)] disabled:cursor-not-allowed disabled:opacity-60"
              >

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                <span className="relative flex items-center justify-center gap-2">

                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      Request Limit Increase
                      <ArrowRight size={18} />
                    </>
                  )}

                </span>

              </button>

            </form>

          </div>

          {/* Bottom Footer */}

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

export default IncreaseLimit;