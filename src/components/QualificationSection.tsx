import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const forYou = [
  "Marcenarias com +3 anos de mercado estabelecido",
  "Capacidade produtiva para projetos grandes",
  "Busca lucro e posicionamento, não apenas volume",
  "Atende ou quer atender o público Classe A",
  "Localizado na região Sul do Brasil",
];

const notForYou = [
  "Marcenarias que competem por preço baixo",
  "Negócios sem estrutura para projetos +R$ 25k",
  "Quem busca resultados imediatos sem estratégia",
];

interface QualificationSectionProps {
  onOpenForm?: () => void;
}

export const QualificationSection = ({ onOpenForm }: QualificationSectionProps) => {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Fit Check
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            É para você?
          </h2>
          <p className="text-muted-foreground text-lg">
            Nossa metodologia funciona melhor com marcenarias que têm esse perfil.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground">
                Ideal para você se:
              </h3>
            </div>
            <ul className="space-y-4">
              {forYou.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <X className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl text-foreground">
                Não é para você se:
              </h3>
            </div>
            <ul className="space-y-4">
              {notForYou.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Se você se identificou com o perfil ideal, vamos conversar.
          </p>
          <Button variant="hero" size="xl" onClick={onOpenForm}>
            Quero previsibilidade de vendas
          </Button>
        </div>
      </div>
    </section>
  );
};
