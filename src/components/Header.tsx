import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-sm bg-primary/20 flex items-center justify-center border border-primary/30">
            <span className="font-display text-xl text-primary font-bold">M</span>
          </div>
          <span className="font-display text-xl text-foreground tracking-wide">
            Método<span className="text-primary">Premium</span>
          </span>
        </div>

        {/* Desktop CTA */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#metodologia" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Metodologia
          </a>
          <a href="#resultados" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Resultados
          </a>
          <Button variant="gold" size="default">
            Agendar Consultoria
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            <a href="#metodologia" className="text-foreground py-2 font-medium">
              Metodologia
            </a>
            <a href="#resultados" className="text-foreground py-2 font-medium">
              Resultados
            </a>
            <Button variant="gold" className="w-full mt-2">
              Agendar Consultoria
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
