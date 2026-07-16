import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";
import {
  ShieldCheck,
  Sparkles,
  Mail,
  ArrowRight,
} from "lucide-react";

function RestOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (canResend) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [canResend]);

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const arr = pasted.split("");

    while (arr.length < 6) arr.push("");

    setOtp(arr);

    inputRefs.current[
      Math.min(pasted.length - 1, 5)
    ]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      return alert("Please enter all 6 digits.");
    }

    setLoading(true);

    try {
      const { data } = await api.post(
        "/api/auth/verifyotp",
        {
          email,
          otp: finalOtp,
        }
      );

      toast.success(
        data.message ||
          "Account verified successfully."
      );

       navigate("/updatepassword");
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResending(true);

    try {
      const { data } = await api.post(
        "/api/auth/resendotp",
        {
          email,
        }
      );

      toast.success(
        data.message || "OTP sent successfully."
      );

      setTimer(30);
      setCanResend(false);
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          "Failed to resend OTP."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />

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

        <div className="w-full max-w-lg">

          <div className="mb-8 text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300">

              <Sparkles size={16} />

              Email Verification

            </div>

            <h1 className="mt-6 text-5xl font-black">

              Aura
              <span className="text-indigo-500">
                Bank
              </span>

            </h1>

            <p className="mt-4 text-slate-400">
              Verify your account to continue.
            </p>

          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(79,70,229,.18)]">

            <div className="border-b border-white/10 px-8 py-6">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    Verify OTP
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Enter the verification code sent to your email.
                  </p>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500">

                  <Mail size={26} />

                </div>

              </div>

              <div className="mt-5 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-3">

                <p className="text-xs text-slate-400">
                  Verification Email
                </p>

                <p className="mt-1 break-all font-medium text-indigo-300">
                  {email}
                </p>

              </div>

            </div>

            <form
              onSubmit={handleVerify}
              className="space-y-8 p-8"
            >

              {/* OTP BOXES */}

              <div className="flex justify-center gap-3">

                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) =>
                      (inputRefs.current[index] = el)
                    }
                    value={digit}
                    maxLength={1}
                    onPaste={handlePaste}
                    onKeyDown={(e) =>
                      handleKeyDown(e, index)
                    }
                    onChange={(e) =>
                      handleOtpChange(
                        e.target.value,
                        index
                      )
                    }
                    className="h-14 w-14 rounded-xl border border-slate-700 bg-slate-900/70 text-center text-2xl font-bold outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                  />
                ))}

              </div>
                            {/* Security Notice */}

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">

                <div className="flex items-start gap-3">

                  <ShieldCheck
                    size={22}
                    className="mt-0.5 text-emerald-400"
                  />

                  <div>

                    <h3 className="font-semibold text-emerald-300">
                      Secure Verification
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      Enter the 6-digit code sent to your registered email
                      address. The code expires shortly for your security.
                    </p>

                  </div>

                </div>

              </div>

              {/* Verify Button */}

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
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify OTP
                      <ArrowRight size={18} />
                    </>
                  )}

                </span>

              </button>

            </form>

            {/* Resend */}

            <div className="border-t border-white/10 px-8 py-6">

              <div className="text-center">

                {canResend ? (
                  <button
                    onClick={handleResendOtp}
                    disabled={resending}
                    className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-5 py-3 font-medium text-indigo-300 transition hover:bg-indigo-500/20 disabled:opacity-60"
                  >
                    {resending
                      ? "Sending OTP..."
                      : "Resend OTP"}
                  </button>
                ) : (
                  <div>

                    <p className="text-slate-400">
                      You can resend a new code in
                    </p>

                    <p className="mt-2 text-3xl font-bold text-indigo-400">
                      {timer}s
                    </p>

                  </div>
                )}

              </div>

              <div className="mt-8 flex items-center justify-center gap-3 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-3">

                <ShieldCheck
                  size={18}
                  className="text-indigo-400"
                />

                <span className="text-center text-sm text-slate-300">
                  Your verification code is encrypted and securely validated.
                </span>

              </div>

              <div className="mt-8 text-center">

                <p className="text-slate-400">

                  Already verified?

                  <Link
                    to="/login"
                    className="ml-2 font-medium text-indigo-400 transition hover:text-indigo-300"
                  >
                    Login
                  </Link>

                </p>

              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="mt-8 text-center text-sm text-slate-500">
            © 2026 AuraBank. Secure Email Verification.
          </div>

        </div>

      </div>

    </div>
  );
}

export default RestOtp;