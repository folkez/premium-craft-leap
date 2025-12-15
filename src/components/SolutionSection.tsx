import { Filter, Target, TrendingUp, CheckCircle2 } from "lucide-react";

const solutions = [
  {
    icon: Filter,
    title: "Filtragem de Curiosos",
    description: "Sistema inteligente que qualifica leads antes de chegarem até você. Só conversa com quem tem budget real.",
    highlights: ["Questionário de qualificação", "Filtro por ticket mínimo", "Triagem automática"],
  },
  {
    icon: Target,
    title: "Posicionamento High-End",
    description: "Estratégia de marca que posiciona sua marcenaria como referência premium na região.",
    highlights: ["Branding estratégico", "Conteúdo de autoridade", "Presença digital premium"],
  },
  {
    icon: TrendingUp,
    title: "Ticket Médio Alto",
    description: "Metodologia focada em atrair projetos de R$ 25k+ com clientes que valorizam qualidade.",
    highlights: ["Segmentação Classe A", "Campanhas direcionadas", "Funil de alta conversão"],
  },
];

export const SolutionSection = () => {
  return (
    <section id="metodologia" className="relative py-24 md:py-32 bg-charcoal-light">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      
      <div className="container px-6">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Nossa Metodologia
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Qualificação, não volume
          </h2>
          <p className="text-muted-foreground text-lg">
            Não entregamos mais leads. Entregamos os leads certos que vão fechar projetos premium com você.
          </p>
        </div>

        {/* Solutions */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className="group relative"
            >
              {/* Card */}
              <div className="h-full p-8 rounded-xl bg-gradient-to-b from-card to-charcoal border border-border hover:border-primary/40 transition-all duration-500 hover:translate-y-[-4px] hover:shadow-[0_20px_60px_hsl(0_0%_0%/0.4)]">
                {/* Number Badge */}
                <div className="absolute -top-4 -right-2 w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <span className="font-display text-lg text-primary font-bold">
                    0{index + 1}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <solution.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl text-foreground mb-4">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {solution.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-3">
                  {solution.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            {["Atrair", "Qualificar", "Converter"].map((step, index) => (
              <div key={step} className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-charcoal border-2 border-primary flex items-center justify-center mb-3">
                  <span className="font-display text-xl text-primary font-bold">
                    {index + 1}
                  </span>
                </div>
                <span className="text-foreground font-medium">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
