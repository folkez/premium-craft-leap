import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Check, Loader2, X } from "lucide-react";
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
    utm_id: params.get("utm_id") || "",
    placement: params.get("placement") || "",
  };
};

// New 3-step schema
const formSchema = z.object({
  // Step 1: Nome + WhatsApp + Email
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  whatsapp: z.string().trim().min(10, "WhatsApp inválido").max(20),
  email: z.string().trim().email("E-mail inválido").max(255),
  // Step 2: Qualification
  companyName: z.string().trim().min(2, "Nome da marcenaria é obrigatório").max(100),
  location: z.string().trim().min(2, "Localização é obrigatória").max(100),
  ticketMedio: z.string().min(1, "Selecione uma opção"),
  // Step 3: Final qualification
  desafio: z.string().min(1, "Selecione uma opção"),
  tempoMarcenaria: z.string().trim().min(1, "Informe há quanto tempo tem a marcenaria").max(100),
  investeMarketing: z.string().min(1, "Selecione uma opção"),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: "Contato", headline: "Vamos começar?" },
  { id: 2, title: "Qualificação", headline: "Sobre sua marcenaria" },
  { id: 3, title: "Finalização", headline: "Último passo!" },
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

const FormRadioGroup = ({ options, value, onChange, columns = 1 }: RadioGroupProps) => (
  <div className={cn("grid gap-3", columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1")}>
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

interface MultiStepFormContentProps {
  onSuccess?: () => void;
}

const MultiStepFormContent = ({ onSuccess }: MultiStepFormContentProps) => {
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
      email: "",
      companyName: "",
      location: "",
      ticketMedio: "",
      desafio: "",
      tempoMarcenaria: "",
      investeMarketing: "",
    },
  });

  const watchedFields = watch();

  const stepFields: Record<number, (keyof FormData)[]> = {
    1: ["name", "whatsapp", "email"],
    2: ["companyName", "location", "ticketMedio"],
    3: ["desafio", "tempoMarcenaria", "investeMarketing"],
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

    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", {
        content_name: "Consultoria Marcenaria Premium",
        content_category: data.ticketMedio,
        value: 0,
        currency: "BRL",
      }, { eventID: eventId });
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        event_category: "Lead",
        event_label: "Consultoria Marcenaria Premium",
        company_name: data.companyName,
        ticket_medio: data.ticketMedio,
      });
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lead_form_submit",
      lead_name: data.name,
      lead_company: data.companyName,
      lead_whatsapp: data.whatsapp,
      lead_ticket: data.ticketMedio,
    });

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          whatsapp: data.whatsapp,
          email: data.email,
          company: data.companyName,
          location: data.location,
          ticket_medio: data.ticketMedio,
          desafio: data.desafio,
          tempo_marcenaria: data.tempoMarcenaria,
          investe_marketing: data.investeMarketing,
          ...utms,
          page_url: window.location.href,
          submitted_at: new Date().toISOString(),
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
    onSuccess?.();
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
    <div>
      {/* Progress Bar */}
      <div className="mb-6">
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
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Etapa {currentStep} de 3
        </p>
      </div>

      {/* Form */}
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

            {/* Step 1: Nome + WhatsApp */}
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
                    className="bg-background border-border focus:border-primary h-12"
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
                    className="bg-background border-border focus:border-primary h-12"
                  />
                  {errors.whatsapp && (
                    <p className="text-destructive text-sm mt-1">{errors.whatsapp.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground mb-2 block">
                    E-mail *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="seu@email.com"
                    className="bg-background border-border focus:border-primary h-12"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Marcenaria + Cidade + Ticket */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div>
                  <Label htmlFor="companyName" className="text-foreground mb-2 block">
                    Nome da marcenaria *
                  </Label>
                  <Input
                    id="companyName"
                    {...register("companyName")}
                    placeholder="Ex: Marcenaria Premium"
                    className="bg-background border-border focus:border-primary h-12"
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
                    className="bg-background border-border focus:border-primary h-12"
                  />
                  {errors.location && (
                    <p className="text-destructive text-sm mt-1">{errors.location.message}</p>
                  )}
                </div>

                <div>
                  <Label className="text-foreground mb-3 block">
                    Ticket médio dos seus projetos *
                  </Label>
                  <Controller
                    name="ticketMedio"
                    control={control}
                    render={({ field }) => (
                      <FormRadioGroup
                        options={[
                          { value: "ate-10k", label: "Até R$ 10 mil" },
                          { value: "10k-25k", label: "R$ 10 mil a R$ 25 mil" },
                          { value: "25k-50k", label: "R$ 25 mil a R$ 50 mil" },
                          { value: "acima-50k", label: "Acima de R$ 50 mil" },
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
              </div>
            )}

            {/* Step 3: Desafio + Tempo + Marketing */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-foreground mb-3 block">
                    Principal desafio hoje *
                  </Label>
                  <Controller
                    name="desafio"
                    control={control}
                    render={({ field }) => (
                      <FormRadioGroup
                        options={[
                          { value: "agenda-irregular", label: "Agenda irregular" },
                          { value: "clientes-sem-budget", label: "Clientes que não têm budget" },
                          { value: "pouco-reconhecimento", label: "Pouco reconhecimento no mercado" },
                          { value: "dependo-indicacoes", label: "Dependo só de indicações" },
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

                <div>
                  <Label htmlFor="tempoMarcenaria" className="text-foreground mb-2 block">
                    Há quanto tempo tem a marcenaria? *
                  </Label>
                  <Input
                    id="tempoMarcenaria"
                    {...register("tempoMarcenaria")}
                    placeholder="Ex: 5 anos"
                    className="bg-background border-border focus:border-primary h-12"
                  />
                  {errors.tempoMarcenaria && (
                    <p className="text-destructive text-sm mt-1">{errors.tempoMarcenaria.message}</p>
                  )}
                </div>

                <div>
                  <Label className="text-foreground mb-3 block">
                    Investe em marketing hoje? *
                  </Label>
                  <Controller
                    name="investeMarketing"
                    control={control}
                    render={({ field }) => (
                      <FormRadioGroup
                        options={[
                          { value: "sim", label: "Sim" },
                          { value: "nao", label: "Não" },
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        columns={2}
                      />
                    )}
                  />
                  {errors.investeMarketing && (
                    <p className="text-destructive text-sm mt-2">{errors.investeMarketing.message}</p>
                  )}
                </div>

                {/* Summary Preview */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-2">Resumo da aplicação:</p>
                  <p className="text-foreground font-medium">
                    {watchedFields.companyName || "Sua marcenaria"} • {watchedFields.location || "Localização"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ticket:{" "}
                    {watchedFields.ticketMedio === "ate-10k"
                      ? "Até R$ 10 mil"
                      : watchedFields.ticketMedio === "10k-25k"
                      ? "R$ 10-25 mil"
                      : watchedFields.ticketMedio === "25k-50k"
                      ? "R$ 25-50 mil"
                      : watchedFields.ticketMedio === "acima-50k"
                      ? "Acima de R$ 50 mil"
                      : "—"}
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

          {currentStep === 1 ? (
            <Button
              type="button"
              variant="hero"
              size="xl"
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              className="w-full sm:w-auto"
            >
              Começar agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          ) : currentStep < 3 ? (
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

      {/* Trust Note */}
      <p className="text-center text-muted-foreground text-sm mt-6">
        🔒 Suas informações estão seguras e não serão compartilhadas.
      </p>
    </div>
  );
};

// Modal wrapper
interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormModal = ({ isOpen, onClose }: FormModalProps) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-border p-6 md:p-8 shadow-[0_20px_60px_hsl(0_0%_0%/0.5)]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors z-20"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 pr-8">
          <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-2">
            Aplicação
          </span>
          <h2 className="font-display text-2xl md:text-3xl text-foreground">
            Candidate-se à <span className="text-gradient-gold">Consultoria</span>
          </h2>
        </div>

        <MultiStepFormContent onSuccess={onClose} />
      </motion.div>
    </div>
  );
};

// Mobile sticky CTA bar
export const MobileStickyBar = ({ onClick }: { onClick: () => void }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const footerThreshold = docHeight - winHeight - 200;
      setVisible(scrollY > 400 && scrollY < footerThreshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="bg-background/95 backdrop-blur-md border-t-2 border-primary px-4 py-3 safe-bottom">
            <Button
              variant="hero"
              size="lg"
              onClick={onClick}
              className="w-full"
            >
              Quero Previsibilidade de Vendas
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Legacy section export (still used in page for anchor)
export const MultiStepForm = () => {
  return null;
};
