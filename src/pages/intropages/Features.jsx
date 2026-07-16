import { Zap, CreditCard, Globe, Bell, BarChart3, Smartphone } from "lucide-react";

function Features() {
  const features = [
    {
      icon: <Zap size={32} />,
      title: "Instant Transfers",
      desc: "Send money securely within seconds."
    },
    {
      icon: <CreditCard size={32} />,
      title: "Smart Cards",
      desc: "Physical and virtual cards with advanced controls."
    },
    {
      icon: <Smartphone size={32} />,
      title: "Mobile Banking",
      desc: "Manage your finances anytime, anywhere."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Expense Analytics",
      desc: "Track spending and monitor financial activity."
    },
    {
      icon: <Globe size={32} />,
      title: "International Payments",
      desc: "Fast and reliable global money transfers."
    },
    {
      icon: <Bell size={32} />,
      title: "Real-Time Alerts",
      desc: "Stay informed with instant notifications."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-20">
            <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
        
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black text-center mb-4">
          Banking Features
        </h1>

        <p className="text-center text-slate-400 max-w-2xl mx-auto mb-16">
          Powerful digital banking tools designed to simplify money management.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <div className="text-indigo-400 mb-5">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {item.title}
              </h3>

              <p className="text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Features;