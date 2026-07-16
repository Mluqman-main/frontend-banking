import {
  Phone,
  Mail,
  MessageCircle,
  Building2,
  Clock,
} from "lucide-react";

function Support() {
  const supportOptions = [
    {
      icon: <Phone size={30} />,
      title: "Phone Support",
      desc: "Talk with our banking team."
    },
    {
      icon: <Mail size={30} />,
      title: "Email Support",
      desc: "Get assistance via email."
    },
    {
      icon: <MessageCircle size={30} />,
      title: "Live Chat",
      desc: "Real-time customer support."
    },
    {
      icon: <Building2 size={30} />,
      title: "Branch Support",
      desc: "Visit your nearest branch."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-20">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black text-center mb-4">
          Support Center
        </h1>

        <p className="text-center text-slate-400 mb-16">
          We're here whenever you need help.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

          {supportOptions.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center"
            >
              <div className="flex justify-center text-indigo-400 mb-4">
                {item.icon}
              </div>

              <h3 className="font-bold text-xl mb-3">
                {item.title}
              </h3>

              <p className="text-slate-400">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <div className="flex items-center gap-3 mb-6">

            <Clock className="text-indigo-400" />

            <h2 className="text-2xl font-bold">
              Banking Hours
            </h2>

          </div>

          <div className="space-y-3 text-slate-300">

            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 9:00 AM - 2:00 PM</p>
            <p>Sunday: Closed</p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Support;