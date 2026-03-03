import { Calendar, UserX, Award } from "lucide-react";

const painPoints = [
  {
    icon: Calendar,
    title: "Agenda oscilando",
    description: "Meses bons, meses ruins. Vive na montanha-russa das indicações sem previsibilidade de faturamento.",
  },
  {
    icon: UserX,
    title: "Curiosos sem orçamento",
    description: "Cansado de gastar horas em orçamentos para pessoas que acham seu trabalho artesanal 'muito caro'.",
  },
  {
    icon: Award,
    title: "Pouco reconhecimento",
    description: "Ótima estrutura técnica e qualidade premium, mas o mercado ainda não reconhece sua marca.",
  },
];

export const PainPointsSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-background">
      <div className="container px-6">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
            O Cenário Atual
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Você se identifica com isso?
          </h2>
          <p className="text-muted-foreground text-lg">
            Se você é dono de marcenaria premium no Sul do Brasil, provavelmente já passou por esses desafios.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {painPoints.map((point, index) => (
            <div
              key={point.title}
              className="group relative p-8 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-[0_8px_40px_hsl(40_45%_55%/0.1)]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <point.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-3">
                {point.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {point.description}
              </p>
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-primary/30 to-transparent transform translate-x-0" />
                <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-primary/30 to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <blockquote className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-primary/20 font-display">"</div>
            <p className="text-xl md:text-2xl text-foreground font-display italic leading-relaxed pt-8">
              Você não precisa de mais clientes.{" "}
              <span className="text-primary">Precisa dos clientes certos.</span>
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};
