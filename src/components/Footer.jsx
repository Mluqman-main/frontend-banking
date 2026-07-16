import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaShieldAlt,
  FaEnvelope,
} from "react-icons/fa";

import { FaMapPin } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950">

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-cyan-500/5 to-purple-600/5" />

      <div className="relative max-w-7xl mx-auto px-6 py-14">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-black text-white">
              Aura
              <span className="text-indigo-500">
                Bank
              </span>
            </h2>

            <p className="mt-5 text-slate-400 leading-7">

              Secure, modern and intelligent digital banking
              designed to make managing your finances simple,
              fast and reliable.

            </p>

            <div className="flex items-center gap-3 mt-6">

              <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition cursor-pointer">
                < FaFacebook size={20} />
              </div>

              <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition cursor-pointer">
                <FaGithub size={20} />
              </div>

              <div className="w-11 h-11 rounded-xl bg-cyan-600 flex items-center justify-center hover:bg-cyan-500 transition cursor-pointer">
                <FaLinkedin size={20} />
              </div>

            </div>

          </div>

          {/* Banking */}

          <div>

            <h3 className="text-white text-xl font-bold mb-5">
              Banking
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-indigo-400 transition"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/transfer"
                  className="hover:text-indigo-400 transition"
                >
                  Transfer Money
                </Link>
              </li>

              <li>
                <Link
                  to="/loan"
                  className="hover:text-indigo-400 transition"
                >
                  Loan Services
                </Link>
              </li>

              <li>
                <Link
                  to="/Transicationshastry"
                  className="hover:text-indigo-400 transition"
                >
                  Transaction History
                </Link>
              </li>

            </ul>

          </div>

          {/* Support */}

          <div>

            <h3 className="text-white text-xl font-bold mb-5">
              Support
            </h3>

            <ul className="space-y-4 text-slate-400">

              <li className="flex items-center gap-3">

                <FaEnvelope size={18} className="text-indigo-400" />

                support@aurabank.com

              </li>

              <li className="flex items-center gap-3">

                <FaPhone size={18} className="text-indigo-400" />

                +92 300 1234567

              </li>

              <li className="flex items-center gap-3">

                <FaMapPin size={18} className="text-indigo-400" />

                Islamabad, Pakistan

              </li>

            </ul>

          </div>

          {/* Security */}

          <div>

            <div className="rounded-3xl border border-indigo-500/20 bg-white/5 backdrop-blur-xl p-6">

              <FaShieldAlt
                className="text-green-400 mb-4"
                size={40}
              />

              <h3 className="text-white text-xl font-bold">
                Bank-Level Security
              </h3>

              <p className="mt-4 text-slate-400 leading-7">

                Your account is protected using encrypted
                communication, secure authentication and
                continuous fraud monitoring.

              </p>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-500 text-sm">

            © {new Date().getFullYear()} AuraBank. All Rights Reserved.

          </p>

          <div className="flex gap-6 text-sm text-slate-400">

            <Link
              to="/PrivacyPolicy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-white transition"
            >
              Terms of Service
            </Link>

            <Link
              to="/security"
              className="hover:text-white transition"
            >
              Security
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;