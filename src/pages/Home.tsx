import { Link } from "react-router-dom";
import { templates } from "@/data/templates";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, Users, Zap } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-32 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-[120px]" />

        <div className="container mx-auto text-center relative z-10">
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 max-w-4xl mx-auto">
            <span className="text-primary neon-text-cyan">10 Stunning Landing Pages</span>{" "}
            <span className="text-foreground">That Auto-Adapt To Your Brand In</span>{" "}
            <span className="text-accent neon-text-gold">60 Seconds</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-4">
            No Coding, Just Your Details!
          </p>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-8">
            Choose from 10 premium designs. Upload your logo & photo, pick colors, add your text — and get a fully personalized landing page instantly.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Link to="/templates" className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-display text-sm font-bold tracking-wider neon-glow-cyan hover:opacity-90 transition-all">
              Browse All Templates
            </Link>
            <a href="#features" className="px-8 py-3 rounded-xl bg-muted text-foreground font-semibold text-sm border border-border hover:border-primary/40 transition-all">
              See How It Works
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground mb-16">
            <span className="flex items-center gap-2"><Users size={16} className="text-primary" /> Used by 50,000+ creators</span>
            <span className="flex items-center gap-2"><Star size={16} className="text-accent" /> 4.98/5 rating</span>
            <span className="flex items-center gap-2"><Zap size={16} className="text-neon-purple" /> Instant export</span>
          </div>
        </div>

        {/* Floating templates */}
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
          {templates.slice(0, 6).map((t, i) => (
            <Link to="/templates" key={t.id}
              className="template-card group animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}>
              <img src={t.image} alt={t.name} className="w-full aspect-video object-cover" />
              <div className="p-3">
                <p className="font-display text-xs font-semibold text-foreground">{t.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-center mb-12">
            <span className="text-primary neon-text-cyan">How It</span>{" "}
            <span className="text-accent neon-text-gold">Works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Choose a Template", desc: "Pick from 10 stunning, industry-specific designs." },
              { step: "02", title: "Customize Everything", desc: "Upload logos, photos, set colors, add your content." },
              { step: "03", title: "Export & Launch", desc: "Preview live, export HTML, and publish instantly." },
            ].map((f) => (
              <div key={f.step} className="glass-card p-6 text-center hover:neon-glow-cyan transition-all duration-500">
                <span className="font-display text-3xl font-black text-primary neon-text-cyan">{f.step}</span>
                <h3 className="font-display text-sm font-bold mt-3 mb-2 text-foreground">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
