import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Users, TrendingUp } from "lucide-react";
import heroKitchen from "@/assets/hero-kitchen.jpg";

interface HeroSectionProps {
  onOpenForm: () => void;
}

export const HeroSection = ({ onOpenForm }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroKitchen}
          alt="Cozinha planejada de alto padrão"
          className="w-full h-full object-cover opacity-20"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal" />
      </div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      {/* Decorative Line */}
      <div className="absolute left-1/2 top-12 w-px h-20 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

      <div className="container relative z-10 px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-cream-muted font-medium tracking-wide">
              Especialistas em Marcenarias Premium
            </span>
          </div>

          {/* Headline - prioritized for LCP */}
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-tight mb-6 animate-fade-up stagger-1">
            Sua Marcenaria não deveria{" "}
            <span className="text-gradient-gold">depender apenas</span>{" "}
            de indicações.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up stagger-2">
            Implementamos um sistema previsível de vendas para fechar projetos{" "}
            <span className="text-foreground font-medium">acima de R$ 25 mil</span>{" "}
            todos os meses, atraindo apenas o público{" "}
            <span className="text-foreground font-medium">Classe A no Sul do Brasil</span>.
          </p>

          {/* Social Proof Numbers - inline above CTA */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-lg md:max-w-2xl mx-auto mb-10 animate-fade-up stagger-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-1">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl md:text-3xl font-display text-primary font-bold">R$ 2.3M+</p>
              <p className="text-xs md:text-sm text-muted-foreground">em projetos fechados</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-1">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl md:text-3xl font-display text-primary font-bold">+15</p>
              <p className="text-xs md:text-sm text-muted-foreground">marcenarias atendidas</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-1">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl md:text-3xl font-display text-primary font-bold">32%</p>
              <p className="text-xs md:text-sm text-muted-foreground">aumento ticket médio</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex items-center justify-center mb-16 animate-fade-up stagger-3">
            <Button variant="hero" size="xl" className="group" onClick={onOpenForm}>
              Quero previsibilidade de vendas
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
