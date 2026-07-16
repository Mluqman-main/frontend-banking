import React, { useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import {
  Landmark,
  CreditCard,
  CalendarDays,
  FileText,
  ShieldCheck,
  Sparkles,
  BadgeDollarSign,
} from "lucide-react";
import BackButton from "./Backbutton";

export default function Loan() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    cnic: "",
    amount: 1000,
    duration: 3,
    purpose: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cnic") {
      let numbers = value.replace(/\D/g, "");

      if (numbers.length > 13)
        numbers = numbers.slice(0, 13);

      let formatted = numbers;

      if (numbers.length > 5) {
        formatted =
          numbers.slice(0, 5) +
          "-" +
          numbers.slice(5);
      }

      if (numbers.length > 12) {
        formatted =
          numbers.slice(0, 5) +
          "-" +
          numbers.slice(5, 12) +
          "-" +
          numbers.slice(12);
      }

      setFormData({
        ...formData,
        cnic: formatted,
      });

      return;
    }

    setFormData({
      ...formData,
      [name]:
        name === "amount" ||
        name === "duration"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.cnic ||
      !formData.amount ||
      !formData.duration ||
      !formData.purpose
    ) {
      return setError("All fields are required.");
    }

    const cnicRegex =
      /^\d{5}-\d{7}-\d{1}$/;

    if (!cnicRegex.test(formData.cnic)) {
      return setError(
        "Please enter a valid CNIC."
      );
    }

    try {
      setLoading(true);

      const idempotencyKey =
        crypto.randomUUID();

      const res = await api.post(
        "/api/auth/createLoan",
        {
          ...formData,
          idempotencyKey,
        }
      );

      toast.success(res.data.message);

      setFormData({
        cnic: "",
        amount: 1000,
        duration: 3,
        purpose: "",
      });

    } catch (err) {

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
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

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">

        <div className="w-full max-w-3xl">

          {/* Heading */}
           <button className="m mt-10">
              <BackButton />
            </button>

          <div className="mb-10 text-center">
           
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300">

              <Sparkles size={16} />

              AuraBank Lending

            </div>

            <h1 className="mt-6 text-5xl font-black">

              Apply for
              <span className="text-indigo-500">
                {" "}Loan
              </span>

            </h1>

            <p className="mt-4 text-slate-400">
              Complete your application securely in just a few steps.
            </p>

          </div>

          {/* Card */}

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(79,70,229,.18)] overflow-hidden">

            <div className="border-b border-white/10 px-8 py-6">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    Loan Application
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Please provide accurate information.
                  </p>

                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500">

                  <Landmark size={30} />

                </div>

              </div>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-8"
            >

              {error && (

                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">

                  {error}

                </div>

              )}

              {/* CNIC */}

              <div>

                <label className="mb-2 block text-sm text-slate-300">
                  CNIC Number
                </label>

                <div className="relative">

                  <CreditCard
                    size={20}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <input
                    type="text"
                    name="cnic"
                    maxLength={15}
                    value={formData.cnic}
                    onChange={handleChange}
                    placeholder="35202-1234567-1"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3.5 pl-12 pr-4 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                  />

                </div>

              </div>

              {/* Loan Amount */}

              <div>

                <label className="mb-2 block text-sm text-slate-300">
                  Loan Amount
                </label>

                <div className="relative">

                  <BadgeDollarSign
                    size={20}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <select
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500"
                  >
                    <option value={1000}>
                      Rs. 1,000
                    </option>

                    <option value={10000}>
                      Rs. 10,000
                    </option>

                    <option value={20000}>
                      Rs. 20,000
                    </option>

                  </select>

                </div>

              </div>

              {/* Duration */}

              <div>

                <label className="mb-2 block text-sm text-slate-300">
                  Loan Duration
                </label>

                <div className="relative">

                  <CalendarDays
                    size={20}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500"
                  >
                    <option value={3}>
                      3 Months
                    </option>

                    <option value={6}>
                      6 Months
                    </option>

                    <option value={12}>
                      12 Months
                    </option>

                  </select>

                </div>

              </div>

              {/* Purpose */}

              <div>

                <label className="mb-2 block text-sm text-slate-300">
                  Loan Purpose
                </label>

                <div className="relative">

                  <FileText
                    size={20}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <textarea
                    name="purpose"
                    rows={5}
                    value={formData.purpose}
                    onChange={handleChange}
                    placeholder="Describe why you are applying for this loan..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3 pl-12 pr-4 outline-none resize-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                  />

                </div>

              </div>
                            {/* Loan Summary */}

              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-6">

                <h3 className="text-lg font-semibold text-white">
                  Loan Summary
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">

                  <div>

                    <p className="text-sm text-slate-400">
                      Requested Amount
                    </p>

                    <h2 className="mt-1 text-2xl font-black text-indigo-400">
                      Rs. {formData.amount.toLocaleString()}
                    </h2>

                  </div>

                  <div>

                    <p className="text-sm text-slate-400">
                      Duration
                    </p>

                    <h2 className="mt-1 text-2xl font-black text-white">
                      {formData.duration} Months
                    </h2>

                  </div>

                </div>

                <div className="mt-5 border-t border-white/10 pt-5">

                  <p className="text-sm text-slate-400">
                    Purpose
                  </p>

                  <p className="mt-2 leading-7 text-slate-300">
                    {formData.purpose || "No purpose entered yet."}
                  </p>

                </div>

              </div>

              {/* Security Information */}

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">

                <div className="flex items-start gap-4">

                  <ShieldCheck
                    size={24}
                    className="mt-1 text-emerald-400"
                  />

                  <div>

                    <h3 className="text-lg font-semibold text-emerald-300">
                      Secure Loan Verification
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Your application is encrypted and securely submitted.
                      The CNIC information is used only for identity
                      verification and loan eligibility checks.
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
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Landmark size={20} />
                      Apply for Loan
                    </>
                  )}

                </span>

              </button>

            </form>

            {/* Footer */}

            <div className="border-t border-white/10 bg-slate-900/30 px-8 py-6">

              <h3 className="text-lg font-semibold text-white">
                Before You Apply
              </h3>

              <ul className="mt-4 space-y-3 text-sm text-slate-400">

                <li>
                  • Ensure your CNIC number is entered correctly.
                </li>

                <li>
                  • Loan approval is subject to bank verification and eligibility.
                </li>

                <li>
                  • Processing times may vary depending on document verification.
                </li>

                <li>
                  • You will be notified once your application has been reviewed.
                </li>

              </ul>

            </div>

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