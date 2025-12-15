import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Clock } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />

      <div className="container px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-8">
            <Phone className="w-10 h-10 text-primary" />
          </div>

          {/* Content */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Pronto para ter{" "}
            <span className="text-gradient-gold">previsibilidade</span>?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Agende uma consultoria gratuita e descubra como podemos implementar 
            um sistema de vendas previsível na sua marcenaria.
          </p>

          {/* CTA */}
          <Button variant="hero" size="xl" className="group mb-8">
            Agendar minha consultoria
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Trust Elements */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Duração: 30 minutos</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <span>100% gratuita e sem compromisso</span>
          </div>
        </div>
      </div>
    </section>
  );
};
