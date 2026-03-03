import { TrendingUp, Users, DollarSign, BarChart3 } from "lucide-react";

const metrics = [
  {
    icon: DollarSign,
    value: "R$ 47k",
    label: "Ticket médio",
    description: "dos projetos fechados",
  },
  {
    icon: Users,
    value: "3.2x",
    label: "ROAS médio",
    description: "retorno sobre investimento",
  },
  {
    icon: TrendingUp,
    value: "R$ 89",
    label: "Custo por lead",
    description: "qualificado",
  },
  {
    icon: BarChart3,
    value: "67%",
    label: "Taxa de fechamento",
    description: "de leads qualificados",
  },
];

const testimonials = [
  {
    quote: "Em 3 meses saímos de 2 projetos/mês para 5 projetos consistentes. O filtro de curiosos mudou tudo.",
    author: "Ricardo M.",
    company: "Marcenaria Premium POA",
    avatar: "R",
  },
  {
    quote: "Finalmente paramos de atender orçamento de R$ 5 mil. Hoje nosso mínimo é R$ 30k e a agenda está cheia.",
    author: "Fernando S.",
    company: "FS Móveis Planejados",
    avatar: "F",
  },
];

export const ResultsSection = () => {
  return (
    <section id="resultados" className="relative py-24 md:py-32 bg-charcoal-light">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(40 45% 55%) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Resultados Reais
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Números que falam
          </h2>
          <p className="text-muted-foreground text-lg">
            Métricas médias dos nossos clientes no último trimestre.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="p-6 rounded-xl bg-card border border-border text-center hover:border-primary/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <metric.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-display text-2xl md:text-4xl text-primary font-bold mb-1">
                {metric.value}
              </p>
              <p className="text-foreground font-medium text-sm mb-1">
                {metric.label}
              </p>
              <p className="text-muted-foreground text-xs">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="p-8 rounded-xl bg-gradient-to-br from-card to-charcoal border border-border"
            >
              {/* Quote */}
              <div className="relative mb-6">
                <span className="absolute -top-4 -left-2 text-5xl text-primary/30 font-display">"</span>
                <p className="text-foreground text-lg leading-relaxed pl-6">
                  {testimonial.quote}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <span className="font-display text-lg text-primary font-bold">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="text-foreground font-medium">{testimonial.author}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Results Disclaimer */}
        <p className="text-center text-muted-foreground text-sm mt-12 max-w-xl mx-auto">
          *Resultados variam de acordo com o mercado, estrutura e investimento de cada marcenaria.
        </p>
      </div>
    </section>
  );
};
