import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/home", label: "Home" },
  { to: "/templates", label: "Templates" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50 rounded-none">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/home" className="font-display text-xl font-bold tracking-wider">
          <span className="text-primary neon-text-cyan">Landing</span>
          <span className="text-accent neon-text-gold">Forge</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                location.pathname === l.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label.toUpperCase()}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-lg bg-primary/10 border border-primary/40 text-primary text-sm font-semibold hover:bg-primary/20 transition-all"
          >
            Logout
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-card border-t border-border/50 rounded-none px-4 pb-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-muted-foreground hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
          <button onClick={handleLogout} className="block w-full text-left py-2 text-sm text-primary">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
