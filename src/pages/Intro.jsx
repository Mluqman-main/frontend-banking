import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  CreditCard,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Features from "./intropages/Features";
import Security from "./intropages/Security";
import Support from "./intropages/Support";

function Intro() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background Effects */}
      <div className="absolute -top-52 left-0 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6 py-16">

        {/* Navbar */}
        <nav className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide">
            Aura
            <span className="text-indigo-500">Bank</span>
          </h1>

          <div className="hidden md:flex gap-6 text-slate-300">
           
              <span className="cursor-pointer hover:text-white" onClick={() => navigate("/features")}>
              Features
            </span>
          

          
              <span className="cursor-pointer hover:text-white" onClick={() => navigate("/security")}>
                Security
              </span>
           

           
              <span className="cursor-pointer hover:text-white" onClick={() => navigate("/support")}>
                Support
              </span>
         
          </div>
        </nav>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mt-20">

          {/* Left */}
          <div>

            <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-indigo-300 text-sm">
              <Sparkles size={16} />
              Next Generation Digital Banking
            </span>

            <h1 className="mt-6 text-6xl font-extrabold leading-tight">
              Banking
              <br />
              Built For
              <span className="text-indigo-500">
                {" "}
                The Future
              </span>
            </h1>

            <p className="mt-6 text-slate-400 text-lg leading-8 max-w-xl">
              Manage your money with confidence. Secure transfers,
              instant payments, advanced protection, and a modern
              banking experience designed for everyone.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-5">

              <Link
                to="/register"
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 font-semibold hover:bg-indigo-700 transition"
              >
                Create Account
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="rounded-xl border border-slate-700 px-8 py-4 font-semibold hover:bg-slate-900 transition"
              >
                Login
              </Link>

            </div>

            {/* Features */}

            <div className="grid grid-cols-3 gap-5 mt-14">

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <ShieldCheck
                  className="text-indigo-400"
                  size={30}
                />
                <p className="mt-3 font-semibold">
                  Bank Security
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <Lock
                  className="text-green-400"
                  size={30}
                />
                <p className="mt-3 font-semibold">
                  Encrypted
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <CreditCard
                  className="text-cyan-400"
                  size={30}
                />
                <p className="mt-3 font-semibold">
                  Smart Cards
                </p>
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="flex justify-center">

            <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">

              <div className="flex justify-between">

                <div>
                  <p className="text-slate-400">
                    Total Balance
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    PKR 2,48,500
                  </h2>
                </div>

                <div className="h-14 w-14 rounded-full bg-indigo-600 flex items-center justify-center">
                  💳
                </div>

              </div>

              <div className="mt-10 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 p-6">

                <p className="text-sm opacity-80">
                  AuraBank Platinum
                </p>

                <h3 className="mt-8 text-2xl tracking-[4px]">
                  **** **** **** 4242
                </h3>

                <div className="mt-8 flex justify-between">
                  <div>
                    <p className="text-xs opacity-70">
                      Card Holder
                    </p>

                    <h4 className="font-semibold">
                      Muhammad Ali
                    </h4>
                  </div>

                  <h3 className="text-2xl font-bold">
                    VISA
                  </h3>
                </div>

              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">

                <div className="rounded-xl bg-slate-900 p-4 text-center">
                  <p className="text-2xl font-bold">
                    2M+
                  </p>

                  <p className="text-xs text-slate-400">
                    Users
                  </p>
                </div>

                <div className="rounded-xl bg-slate-900 p-4 text-center">
                  <p className="text-2xl font-bold">
                    99.99%
                  </p>

                  <p className="text-xs text-slate-400">
                    Uptime
                  </p>
                </div>

                <div className="rounded-xl bg-slate-900 p-4 text-center">
                  <p className="text-2xl font-bold">
                    24/7
                  </p>

                  <p className="text-xs text-slate-400">
                    Support
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
      <Features />
      <Security />
      <Support />

    </div>
  );
}

export default Intro;