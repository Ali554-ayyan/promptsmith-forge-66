import { useState } from "react";
import { templates, categories } from "@/data/templates";

interface Props {
  onSelect?: (id: number) => void;
  showFilter?: boolean;
}

const TemplateGrid = ({ onSelect, showFilter = true }: Props) => {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? templates : templates.filter((t) => t.category === filter);

  return (
    <div>
      {showFilter && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === c
                  ? "bg-primary text-primary-foreground neon-glow-cyan"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <div key={t.id} className="template-card group" onClick={() => onSelect?.(t.id)}>
            <div className="aspect-video overflow-hidden">
              <img src={t.image} alt={t.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-sm font-semibold text-foreground">{t.name}</h3>
                <span className="text-xs text-muted-foreground">{t.category}</span>
              </div>
              <button className="px-4 py-1.5 rounded-lg bg-primary/10 border border-primary/40 text-primary text-xs font-semibold hover:bg-primary/20 transition-all">
                Customize Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGrid;
