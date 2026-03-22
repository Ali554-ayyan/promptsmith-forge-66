import { useNavigate } from "react-router-dom";
import { templates } from "@/data/templates";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background grid-pattern flex items-center justify-center relative overflow-hidden">
      {/* Floating template previews in background */}
      {templates.slice(0, 4).map((t, i) => (
        <img
          key={t.id}
          src={t.image}
          alt=""
          className="absolute w-48 rounded-xl opacity-10 animate-float border border-border"
          style={{
            top: `${15 + i * 20}%`,
            left: i % 2 === 0 ? `5%` : `75%`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}

      {/* Glowing orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]" />

      {/* Login card */}
      <div className="glass-card neon-glow-cyan p-8 md:p-12 max-w-md w-full mx-4 text-center relative z-10">
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
          <span className="text-primary neon-text-cyan">Landing</span>
          <span className="text-accent neon-text-gold">Forge</span>
        </h1>
        <p className="text-muted-foreground text-sm mb-8">Welcome to LandingForge</p>

        <button
          onClick={() => navigate("/home")}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-display text-sm font-bold tracking-wider neon-glow-cyan hover:opacity-90 transition-all mb-3"
        >
          Continue with Google
        </button>
        <button
          onClick={() => navigate("/home")}
          className="w-full py-3 rounded-xl bg-muted text-foreground font-semibold text-sm border border-border hover:border-primary/40 transition-all"
        >
          Continue as Guest
        </button>

        <p className="text-xs text-muted-foreground mt-6">
          Instant access • No credit card needed • Start customizing in seconds
        </p>
      </div>
    </div>
  );
};

export default Login;
