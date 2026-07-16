import {
  ShieldCheck,
  Lock,
  Fingerprint,
  Smartphone,
  Eye,
  KeyRound,
} from "lucide-react";

function Security() {
  const security = [
    "End-to-End Encryption",
    "Two-Factor Authentication",
    "OTP Verification",
    "Biometric Authentication",
    "Fraud Monitoring",
    "Device Verification",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-20">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-20">

          <ShieldCheck
            size={80}
            className="mx-auto text-indigo-500 mb-6"
          />

          <h1 className="text-5xl font-black">
            Security First
          </h1>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
            Multiple layers of protection keep your account and transactions secure.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <div className="space-y-5">

              {security.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4"
                >
                  <ShieldCheck className="text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}

            </div>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <div className="grid grid-cols-2 gap-6">

              <Lock size={50} className="text-indigo-400" />
              <Fingerprint size={50} className="text-cyan-400" />
              <Smartphone size={50} className="text-green-400" />
              <Eye size={50} className="text-purple-400" />
              <KeyRound size={50} className="text-yellow-400" />
              <ShieldCheck size={50} className="text-red-400" />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Security;