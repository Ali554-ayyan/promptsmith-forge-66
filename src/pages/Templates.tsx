import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplateGrid from "@/components/TemplateGrid";
import CustomizeModal from "@/components/CustomizeModal";

const Templates = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Navbar />
      <section className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">
            <span className="text-primary neon-text-cyan">Premium</span>{" "}
            <span className="text-foreground">Templates</span>
          </h1>
          <p className="text-center text-muted-foreground text-sm mb-10">Browse all 9 stunning landing page designs</p>
          <TemplateGrid onSelect={setSelectedId} />
        </div>
      </section>
      {selectedId && <CustomizeModal templateId={selectedId} onClose={() => setSelectedId(null)} />}
      <Footer />
    </div>
  );
};

export default Templates;
