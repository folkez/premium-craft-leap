import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Declare global types for tracking
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Helper functions for tracking
const getCookie = (name: string): string => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || "";
  return "";
};

const getUrlParam = (name: string): string => {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || "";
};

const getUtmParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
  };
};

// Optimized 3-step form for higher conversion
const formSchema = z.object({
  // Step 1: Contact
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  whatsapp: z.string().trim().min(10, "WhatsApp inválido").max(20),
  companyName: z.string().trim().min(2, "Nome da marcenaria é obrigatório").max(100),
  location: z.string().trim().min(2, "Localização é obrigatória").max(100),
  // Step 2: Qualification
  ticketMedio: z.string().min(1, "Selecione uma opção"),
  desafio: z.string().min(1, "Selecione uma opção"),
  // Step 3: Readiness
  investeMarketing: z.string().min(1, "Selecione uma opção"),
  timing: z.string().min(1, "Selecione uma opção"),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: "Contato", headline: "Vamos conhecer sua marcenaria" },
  { id: 2, title: "Negócio", headline: "Sobre seu momento atual" },
  { id: 3, title: "Próximos passos", headline: "Timing e investimento" },
];

interface RadioCardProps {
  value: string;
  label: string;
  selected: boolean;
  onChange: () => void;
}

const RadioCard = ({ value, label, selected, onChange }: RadioCardProps) => (
  <button
    type="button"
    onClick={onChange}
    className={cn(
      "w-full p-4 rounded-lg border-2 text-left transition-all duration-300",
      "hover:border-primary/50 hover:bg-primary/5",
      selected
        ? "border-primary bg-primary/10 text-foreground"
        : "border-border bg-card text-muted-foreground"
    )}
  >
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
          selected ? "border-primary bg-primary" : "border-muted-foreground"
        )}
      >
        {selected && <Check className="w-3 h-3 text-primary-foreground" />}
      </div>
      <span className={cn("text-sm font-medium", selected && "text-foreground")}>
        {label}
      </span>
    </div>
  </button>
);

interface RadioGroupProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  columns?: 1 | 2;
}

const RadioGroup = ({ options, value, onChange, columns = 1 }: RadioGroupProps) => (
  <div className={cn("grid gap-3", columns === 2 ? "grid-cols-2" : "grid-cols-1")}>
    {options.map((option) => (
      <RadioCard
        key={option.value}
        value={option.value}
        label={option.label}
        selected={value === option.value}
        onChange={() => onChange(option.value)}
      />
    ))}
  </div>
);

const WEBHOOK_URL = "https://webhook.hypegt.cloud/webhook/lp-lovable-marcenaria";

export const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [utms] = useState(() => getUtmParams());

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      whatsapp: "",
      companyName: "",
      location: "",
      ticketMedio: "",
      desafio: "",
      investeMarketing: "",
      timing: "",
    },
  });

  const watchedFields = watch();

  const stepFields: Record<number, (keyof FormData)[]> = {
    1: ["name", "whatsapp", "companyName", "location"],
    2: ["ticketMedio", "desafio"],
    3: ["investeMarketing", "timing"],
  };

  const isStepValid = (step: number) => {
    const fields = stepFields[step];
    return fields.every((field) => {
      const value = watchedFields[field];
      return value && value.length > 0 && !errors[field];
    });
  };

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100 + (isStepValid(currentStep) ? 33.3 : 0);

  const handleNext = async () => {
    const isValid = await trigger(stepFields[currentStep]);
    if (isValid && currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc") || getUrlParam("fbclid");
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const externalId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Client-side Meta Pixel Lead event (with eventID for dedup)
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", {
        content_name: "Consultoria Marcenaria Premium",
        content_category: data.ticketMedio,
        value: 0,
        currency: "BRL",
      }, { eventID: eventId });
    }

    // Client-side GA4 generate_lead event
    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        event_category: "Lead",
        event_label: "Consultoria Marcenaria Premium",
        company_name: data.companyName,
        ticket_medio: data.ticketMedio,
      });
    }

    // GTM dataLayer push
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lead_form_submit",
      lead_name: data.name,
      lead_company: data.companyName,
      lead_whatsapp: data.whatsapp,
      lead_ticket: data.ticketMedio,
    });

    // Webhook with lead data + UTMs + Meta CAPI fields
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Lead data
          name: data.name,
          whatsapp: data.whatsapp,
          company: data.companyName,
          location: data.location,
          ticket_medio: data.ticketMedio,
          desafio: data.desafio,
          investe_marketing: data.investeMarketing,
          timing: data.timing,

          // UTMs
          ...utms,

          // Metadata
          page_url: window.location.href,
          submitted_at: new Date().toISOString(),

          // Meta CAPI data for N8N
          meta_capi: {
            event_id: eventId,
            external_id: externalId,
            fbp: fbp || "",
            fbc: fbc || "",
            client_user_agent: navigator.userAgent,
            fn: data.name,
            ph: data.whatsapp,
            country: "br",
            action_source: "website",
          },
        }),
      });
    } catch (err) {
      console.error("Webhook error:", err);
    }

    toast({
      title: "Aplicação enviada com sucesso!",
      description: "Entraremos em contato em até 24 horas.",
    });

    setIsSubmitting(false);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section id="aplicar" className="relative py-24 md:py-32 bg-charcoal-light">
      <div className="container px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
              Aplicação
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Candidate-se à <span className="text-gradient-gold">Consultoria</span>
            </h2>
            <p className="text-muted-foreground">
              Preencha o formulário abaixo e nossa equipe entrará em contato.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-3">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-2 text-xs font-medium transition-colors",
                    currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 transition-all",
                      currentStep > step.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : currentStep === step.id
                        ? "border-primary text-primary"
                        : "border-muted-foreground text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className="hidden sm:inline">{step.title}</span>
                </div>
              ))}
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-gold-light rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-[0_20px_60px_hsl(0_0%_0%/0.3)]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait" custom={currentStep}>
                <motion.div
                  key={currentStep}
                  custom={currentStep}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {/* Step Headline */}
                  <h3 className="font-display text-xl md:text-2xl text-foreground mb-6">
                    {steps[currentStep - 1].headline}
                  </h3>

                  {/* Step 1: Contact */}
                  {currentStep === 1 && (
                    <div className="space-y-5">
                      <div>
                        <Label htmlFor="name" className="text-foreground mb-2 block">
                          Nome completo *
                        </Label>
                        <Input
                          id="name"
                          {...register("name")}
                          placeholder="Seu nome"
                          className="bg-background border-border focus:border-primary"
                        />
                        {errors.name && (
                          <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="whatsapp" className="text-foreground mb-2 block">
                          WhatsApp *
                        </Label>
                        <Input
                          id="whatsapp"
                          type="tel"
                          {...register("whatsapp")}
                          placeholder="(51) 99999-9999"
                          className="bg-background border-border focus:border-primary"
                        />
                        {errors.whatsapp && (
                          <p className="text-destructive text-sm mt-1">{errors.whatsapp.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="companyName" className="text-foreground mb-2 block">
                          Nome da marcenaria *
                        </Label>
                        <Input
                          id="companyName"
                          {...register("companyName")}
                          placeholder="Ex: Marcenaria Premium"
                          className="bg-background border-border focus:border-primary"
                        />
                        {errors.companyName && (
                          <p className="text-destructive text-sm mt-1">{errors.companyName.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="location" className="text-foreground mb-2 block">
                          Cidade / Estado *
                        </Label>
                        <Input
                          id="location"
                          {...register("location")}
                          placeholder="Ex: Porto Alegre / RS"
                          className="bg-background border-border focus:border-primary"
                        />
                        {errors.location && (
                          <p className="text-destructive text-sm mt-1">{errors.location.message}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Qualification */}
                  {currentStep === 2 && (
                    <div className="space-y-8">
                      <div>
                        <Label className="text-foreground mb-3 block">
                          Qual seu ticket médio por projeto? *
                        </Label>
                        <Controller
                          name="ticketMedio"
                          control={control}
                          render={({ field }) => (
                            <RadioGroup
                              options={[
                                { value: "ate-15k", label: "Até R$ 15 mil" },
                                { value: "15k-25k", label: "R$ 15 mil a R$ 25 mil" },
                                { value: "25k-40k", label: "R$ 25 mil a R$ 40 mil" },
                                { value: "acima-40k", label: "Acima de R$ 40 mil" },
                              ]}
                              value={field.value}
                              onChange={field.onChange}
                              columns={2}
                            />
                          )}
                        />
                        {errors.ticketMedio && (
                          <p className="text-destructive text-sm mt-2">{errors.ticketMedio.message}</p>
                        )}
                      </div>

                      <div>
                        <Label className="text-foreground mb-3 block">
                          Qual seu principal desafio hoje? *
                        </Label>
                        <Controller
                          name="desafio"
                          control={control}
                          render={({ field }) => (
                            <RadioGroup
                              options={[
                                { value: "leads-sem-orcamento", label: "Leads sem orçamento" },
                                { value: "falta-previsibilidade", label: "Falta de previsibilidade" },
                                { value: "posicionamento", label: "Posicionamento premium" },
                                { value: "agenda-instavel", label: "Agenda instável" },
                                { value: "outro", label: "Outro" },
                              ]}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {errors.desafio && (
                          <p className="text-destructive text-sm mt-2">{errors.desafio.message}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Readiness */}
                  {currentStep === 3 && (
                    <div className="space-y-8">
                      <div>
                        <Label className="text-foreground mb-3 block">
                          Você já investe em marketing pago? *
                        </Label>
                        <Controller
                          name="investeMarketing"
                          control={control}
                          render={({ field }) => (
                            <RadioGroup
                              options={[
                                { value: "sim-atualmente", label: "Sim, atualmente" },
                                { value: "ja-investiu", label: "Já investi, mas parei" },
                                { value: "nunca", label: "Nunca investi" },
                              ]}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {errors.investeMarketing && (
                          <p className="text-destructive text-sm mt-2">{errors.investeMarketing.message}</p>
                        )}
                      </div>

                      <div>
                        <Label className="text-foreground mb-3 block">
                          Quando pretende estruturar sua aquisição de clientes? *
                        </Label>
                        <Controller
                          name="timing"
                          control={control}
                          render={({ field }) => (
                            <RadioGroup
                              options={[
                                { value: "imediatamente", label: "Imediatamente" },
                                { value: "30-dias", label: "Próximos 30 dias" },
                                { value: "60-90-dias", label: "60–90 dias" },
                                { value: "pesquisando", label: "Apenas pesquisando" },
                              ]}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {errors.timing && (
                          <p className="text-destructive text-sm mt-2">{errors.timing.message}</p>
                        )}
                      </div>

                      {/* Summary Preview */}
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="text-sm text-muted-foreground mb-2">Resumo da aplicação:</p>
                        <p className="text-foreground font-medium">
                          {watchedFields.companyName || "Sua marcenaria"} • {watchedFields.location || "Localização"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Ticket: {
                            watchedFields.ticketMedio === "ate-15k" ? "Até R$ 15 mil" :
                            watchedFields.ticketMedio === "15k-25k" ? "R$ 15-25 mil" :
                            watchedFields.ticketMedio === "25k-40k" ? "R$ 25-40 mil" :
                            watchedFields.ticketMedio === "acima-40k" ? "Acima de R$ 40 mil" : "—"
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={cn(currentStep === 1 && "invisible")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    variant="gold"
                    onClick={handleNext}
                    disabled={!isStepValid(currentStep)}
                  >
                    Próximo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="hero"
                    disabled={!isStepValid(currentStep) || isSubmitting}
                    className="min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Aplicação
                        <Check className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Trust Note */}
          <p className="text-center text-muted-foreground text-sm mt-6">
            🔒 Suas informações estão seguras e não serão compartilhadas.
          </p>
        </div>
      </div>
    </section>
  );
};
