import { useState } from "react";
import { Send, Clock, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll reply within 2 hours.");
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Navbar />
      <section className="pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h1 className="font-display text-3xl font-bold mb-4">
              <span className="text-primary neon-text-cyan">Get In</span>{" "}
              <span className="text-foreground">Touch</span>
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-sm text-foreground focus:border-primary focus:outline-none" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-sm text-foreground focus:border-primary focus:outline-none" />
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Your message..."
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-sm text-foreground h-32 focus:border-primary focus:outline-none" />
              <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display text-sm font-bold tracking-wider neon-glow-cyan hover:opacity-90 transition-all">
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <div className="glass-card p-6 neon-glow-cyan">
              <Clock className="text-primary mb-3" size={28} />
              <h3 className="font-display text-sm font-bold text-foreground mb-1">Fast Response</h3>
              <p className="text-xs text-muted-foreground">We reply within 2 hours during business hours.</p>
            </div>
            <div className="glass-card p-6 neon-glow-purple">
              <Mail className="text-neon-purple mb-3" size={28} />
              <h3 className="font-display text-sm font-bold text-foreground mb-1">Email Us</h3>
              <p className="text-xs text-muted-foreground">hello@landingforge.com</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
