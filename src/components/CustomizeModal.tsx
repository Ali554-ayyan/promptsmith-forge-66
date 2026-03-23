import { useState, useRef } from "react";
import { X, Plus, Trash2, Download, Eye, ImageIcon } from "lucide-react";
import { templates } from "@/data/templates";
import { generateHTML, previewHTML, fileToDataUrl, downloadAsImage } from "@/lib/generateTemplate";
import { toast } from "sonner";

interface Props {
  templateId: number;
  onClose: () => void;
}

const CustomizeModal = ({ templateId, onClose }: Props) => {
  const template = templates.find((t) => t.id === templateId);
  const [businessName, setBusinessName] = useState("");
  const [headline, setHeadline] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#00BFFF");
  const [accentColor, setAccentColor] = useState("#FFD700");
  const [themeStyle, setThemeStyle] = useState(template?.name || "");
  const [menuItems, setMenuItems] = useState([{ label: "", url: "" }]);
  const [stats, setStats] = useState([{ number: "", label: "" }]);
  const [testimonialQuote, setTestimonialQuote] = useState("");
  const [testimonialName, setTestimonialName] = useState("");

  const logoRef = useRef<HTMLInputElement>(null);
  const heroRef = useRef<HTMLInputElement>(null);

  if (!template) return null;

  const getTemplateData = async () => {
    let logoDataUrl: string | undefined;
    let heroDataUrl: string | undefined;

    if (logoRef.current?.files?.[0]) {
      logoDataUrl = await fileToDataUrl(logoRef.current.files[0]);
    }
    if (heroRef.current?.files?.[0]) {
      heroDataUrl = await fileToDataUrl(heroRef.current.files[0]);
    }

    return {
      businessName: businessName || "My Business",
      headline: headline || "Your Amazing Headline",
      subheadline: subheadline || "Your compelling subheadline goes here.",
      ctaText: ctaText || "GET STARTED",
      primaryColor,
      accentColor,
      themeStyle,
      menuItems,
      stats,
      testimonialQuote,
      testimonialName,
      logoDataUrl,
      heroDataUrl,
    };
  };

  const handlePreview = async () => {
    const data = await getTemplateData();
    const html = generateHTML(data);
    previewHTML(html);
    toast.success("Preview opened in a new tab!");
  };

  const handleExport = async () => {
    const data = await getTemplateData();
    const html = generateHTML(data);
    const filename = `${(businessName || "landing-page").toLowerCase().replace(/\s+/g, "-")}.html`;
    downloadHTML(html, filename);
    toast.success("HTML file downloaded!");
  };

  const handleSave = () => {
    toast.success("Template saved successfully!");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div className="glass-card neon-glow-cyan max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg font-bold text-primary">Customize: {template.name}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
        </div>

        <img src={template.image} alt={template.name} className="w-full aspect-video object-cover rounded-lg mb-6 border border-border" />

        <div className="space-y-4">
          {[
            { label: "Business Name *", value: businessName, set: setBusinessName, placeholder: "Ocean Ventures" },
            { label: "Headline *", value: headline, set: setHeadline, placeholder: "Deep Dive Adventures" },
            { label: "Primary CTA Text *", value: ctaText, set: setCtaText, placeholder: "BOOK A DIVE" },
          ].map((f) => (
            <div key={f.label}>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">{f.label}</label>
              <input value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground focus:border-primary focus:outline-none" />
            </div>
          ))}

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Subheadline *</label>
            <textarea value={subheadline} onChange={(e) => setSubheadline(e.target.value)} placeholder="Explore 500+ dive sites..."
              className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground h-20 focus:border-primary focus:outline-none" />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Logo Upload (PNG/SVG) *</label>
            <input ref={logoRef} type="file" accept="image/*"
              className="w-full text-sm text-muted-foreground file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border file:border-primary/40 file:bg-primary/10 file:text-primary file:text-xs file:font-semibold" />
          </div>

          {/* Hero Photo Upload */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Hero Photo Upload *</label>
            <input ref={heroRef} type="file" accept="image/*"
              className="w-full text-sm text-muted-foreground file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border file:border-primary/40 file:bg-primary/10 file:text-primary file:text-xs file:font-semibold" />
          </div>

          {/* Extra Images */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Extra Images</label>
            <input type="file" accept="image/*" multiple
              className="w-full text-sm text-muted-foreground file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border file:border-primary/40 file:bg-primary/10 file:text-primary file:text-xs file:font-semibold" />
          </div>

          {/* Colors & Theme */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Primary Color *</label>
              <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer bg-transparent" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Accent Color *</label>
              <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer bg-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Theme Style *</label>
            <select value={themeStyle} onChange={(e) => setThemeStyle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground">
              {templates.map((t) => <option key={t.id} value={t.name}>{t.name}</option>)}
            </select>
          </div>

          {/* Menu Items */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Menu Items</label>
            {menuItems.map((item, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={item.label} onChange={(e) => { const n = [...menuItems]; n[i].label = e.target.value; setMenuItems(n); }}
                  placeholder="Label" className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground" />
                <input value={item.url} onChange={(e) => { const n = [...menuItems]; n[i].url = e.target.value; setMenuItems(n); }}
                  placeholder="URL" className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground" />
                <button onClick={() => setMenuItems(menuItems.filter((_, j) => j !== i))} className="text-destructive"><Trash2 size={16} /></button>
              </div>
            ))}
            <button onClick={() => setMenuItems([...menuItems, { label: "", url: "" }])}
              className="flex items-center gap-1 text-xs text-primary hover:underline"><Plus size={14} /> Add menu item</button>
          </div>

          {/* Stats */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Stats</label>
            {stats.map((s, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={s.number} onChange={(e) => { const n = [...stats]; n[i].number = e.target.value; setStats(n); }}
                  placeholder="500+" className="w-24 px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground" />
                <input value={s.label} onChange={(e) => { const n = [...stats]; n[i].label = e.target.value; setStats(n); }}
                  placeholder="Dive Sites" className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground" />
                <button onClick={() => setStats(stats.filter((_, j) => j !== i))} className="text-destructive"><Trash2 size={16} /></button>
              </div>
            ))}
            <button onClick={() => setStats([...stats, { number: "", label: "" }])}
              className="flex items-center gap-1 text-xs text-primary hover:underline"><Plus size={14} /> Add stat</button>
          </div>

          {/* Testimonial */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Testimonial</label>
            <textarea value={testimonialQuote} onChange={(e) => setTestimonialQuote(e.target.value)}
              placeholder="The geometric design transformed our brand..." className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground h-16" />
            <input value={testimonialName} onChange={(e) => setTestimonialName(e.target.value)}
              placeholder="Jane Doe, CEO" className="w-full mt-2 px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-border">
          <button onClick={handlePreview} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm neon-glow-cyan hover:opacity-90 transition-all">
            <Eye size={16} /> Preview Live
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm neon-glow-purple hover:opacity-90 transition-all">
            <Download size={16} /> Export HTML
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-semibold text-sm neon-glow-gold hover:opacity-90 transition-all">
            <Save size={16} /> Save Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeModal;
