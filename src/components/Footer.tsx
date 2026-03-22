import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/20 mt-20">
    <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="font-display text-lg font-bold mb-3">
          <span className="text-primary">Landing</span>
          <span className="text-accent">Forge</span>
        </h3>
        <p className="text-sm text-muted-foreground">One-click customizable landing pages for creators.</p>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3 text-foreground">Pages</h4>
        {["Home", "Templates", "Services", "About", "Contact"].map((p) => (
          <Link key={p} to={`/${p.toLowerCase()}`} className="block text-sm text-muted-foreground hover:text-primary mb-1">
            {p}
          </Link>
        ))}
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3 text-foreground">Social</h4>
        {["Twitter", "Instagram", "LinkedIn", "YouTube"].map((s) => (
          <a key={s} href="#" className="block text-sm text-muted-foreground hover:text-primary mb-1">{s}</a>
        ))}
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3 text-foreground">Newsletter</h4>
        <p className="text-sm text-muted-foreground mb-2">Get the latest templates & tips.</p>
        <input className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground" placeholder="your@email.com" />
      </div>
    </div>
    <div className="border-t border-border/50 py-4 text-center text-sm text-muted-foreground">
      © 2026 LandingForge – Made with ❤️ for creators
    </div>
  </footer>
);

export default Footer;
