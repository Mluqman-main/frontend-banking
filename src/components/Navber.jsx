import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

import {
 
  LogOut,
  KeyRound,
  History,
  ChevronDown,
  WalletCards,
  HandCoins,
  LayoutDashboard,
  Bell,
 
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const menuRef = useRef(null);

  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handler
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handler
      );
  }, []);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const { data } = await api.get(
        "/api/auth/me"
      );

      setUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const initials = user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <header className="fixed w-full top-0 z-50 border-b border-slate-800 bg-blue-400/20 backdrop-blur-xl">

      <div className="mx-auto flex h-20 items-center justify-between px-8">

        {/* Logo */}

        <div
          onClick={() =>
            navigate("/bank-dashboard")
          }
          className="cursor-pointer select-none"
        >

          <h1 className="text-3xl font-black tracking-tight text-white">

            Aura
            <span className="text-indigo-500">
              Bank
            </span>

          </h1>

          <p className="text-xs text-slate-500">
            Digital Banking Platform
          </p>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-5">

          {/* Notification */}

          <button className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 hover:border-indigo-500 transition">

            <Bell
              size={20}
              className="text-slate-300"
            />

            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-green-500" />

          </button>

          {/* Profile */}

          <div
            ref={menuRef}
            className="relative"
          >

            <button
              onClick={() =>
                setOpen(!open)
              }
              className="flex items-center gap-4 rounded-xl  border-blue-600 px-4 py-2  backdrop-blur-xl transition"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 text-lg font-bold">

                {initials || "U"}

              </div>

              <div className="text-left backdrop-blur-xl" >

                <h3 className="font-semibold text-white">

                  {user?.name}

                </h3>

                <p className="text-xs text-green-400">

                  ● Online

                </p>

              </div>

              <ChevronDown
                size={18}
                className={`text-slate-400 transition   ${
                  open
                    ? "rotate-180"
                    : ""
                }`}
              />

            </button>
                        {open && (
              <div className="absolute right-0 mt-4 w-80 overflow-hidden rounded-3xl border-b border-slate-800 bg-blue-800/10 backdrop-blur-2xl shadow-2xl bg-opacity-75">

                {/* User Header */}

                <div className="bg-gradient-to-r from-indigo-800 via-indigo-600   to-indigo-500 p-6">

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-xl font-bold text-white ">
                      {initials || "U"}
                    </div>

                    <div>

                      <h2 className="text-lg font-bold text-white">
                        {user?.name}
                      </h2>

                      <p className="text-sm text-blue-100 break-all">
                        {user?.email}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Menu */}

                <div className="p-2">

                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/bankdashboard");
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-200 transition hover:bg-slate-700"
                  >
                    <LayoutDashboard size={20} />
                    Dashboard
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/Transicationshastry");
                    }}
                    className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-200 transition hover:bg-slate-800"
                  >
                    <History size={20} />
                    Transaction History
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/loan-limit");
                    }}
                    className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-200 transition hover:bg-slate-800"
                  >
                    <WalletCards size={20} />
                    Loan Limit
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/loan");
                    }}
                    className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-200 transition hover:bg-slate-800"
                  >
                    <HandCoins size={20} />
                    Get Loan
                  </button>

                

                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/forgotpassword", {
                        replace: true,
                      });
                    }}
                    className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-200 transition hover:bg-slate-800"
                  >
                    <KeyRound size={20} />
                    Reset Password
                  </button>

                  <div className="my-3 border-t border-slate-700" />

                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;