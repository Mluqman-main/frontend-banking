import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-slate-300 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
    >
      <ArrowLeft
        size={18}
        className="transition-transform group-hover:-translate-x-1"
      />

      Back
    </button>
  );
}

export default BackButton;