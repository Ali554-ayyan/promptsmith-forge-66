import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Sparkles, Palette, Zap, Globe } from "lucide-react";

const team = [
  { name: "Alex Rivera", role: "Founder & CEO", avatar: "AR" },
  { name: "Priya Sharma", role: "Lead Designer", avatar: "PS" },
  { name: "Marcus Chen", role: "CTO", avatar: "MC" },
];

const testimonials = [
  { quote: "LandingForge transformed our online presence overnight. Absolutely stunning templates!", name: "Jane Doe", role: "CEO, TechStart" },
  { quote: "The easiest landing page builder I've ever used. Export-ready in minutes.", name: "Carlos Mendez", role: "Freelance Designer" },
  { quote: "Our conversion rate jumped 300% after switching to LandingForge templates.", name: "Sophie Laurent", role: "Marketing Director" },
];

const About = () => (
  <div className="min-h-screen bg-background grid-pattern">
    <Navbar />

    {/* Story */}
    <section className="pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">
          <span className="text-primary neon-text-cyan">How LandingForge</span>{" "}
          <span className="text-accent neon-text-gold">Was Born</span>
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          We noticed creators spending weeks building landing pages that still didn't look professional. So we built LandingForge — 10 premium, auto-adaptive templates that transform with just your details. No coding. No design skills. Just your vision, beautifully realized in 60 seconds.
        </p>
      </div>
    </section>

    {/* Features */}
    <section className="py-16 px-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl">
        {[
          { icon: Sparkles, title: "AI-Powered", desc: "Smart adaptation to your brand identity" },
          { icon: Palette, title: "Fully Customizable", desc: "Colors, fonts, layouts — everything" },
          { icon: Zap, title: "Lightning Fast", desc: "Export-ready code in seconds" },
          { icon: Globe, title: "Responsive", desc: "Perfect on every screen size" },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="glass-card p-6 text-center hover:neon-glow-cyan transition-all duration-500">
            <Icon className="text-primary mx-auto mb-3" size={28} />
            <h3 className="font-display text-sm font-bold text-foreground mb-1">{title}</h3>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Team */}
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-center mb-10 text-foreground">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {team.map((m) => (
            <div key={m.name} className="glass-card p-6 text-center hover:neon-glow-purple transition-all duration-500">
              <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-3 font-display text-lg font-bold text-primary">
                {m.avatar}
              </div>
              <h3 className="font-semibold text-sm text-foreground">{m.name}</h3>
              <p className="text-xs text-muted-foreground">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-2xl font-bold text-center mb-10 text-foreground">What Creators Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass-card p-6 hover:neon-glow-gold transition-all duration-500">
              <p className="text-sm text-muted-foreground italic mb-4">"{t.quote}"</p>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 px-4 text-center">
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
        <span className="text-foreground">Ready to create your</span>{" "}
        <span className="text-primary neon-text-cyan">perfect landing page?</span>
      </h2>
      <Link to="/services" className="inline-block px-8 py-3 rounded-xl bg-primary text-primary-foreground font-display text-sm font-bold tracking-wider neon-glow-cyan hover:opacity-90 transition-all">
        Start Customizing Now
      </Link>
    </section>

    <Footer />
  </div>
);

export default About;
