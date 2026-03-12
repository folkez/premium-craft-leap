import { useState, lazy, Suspense } from "react";
import { HeroSection } from "@/components/HeroSection";
import { FormModal, MobileStickyBar } from "@/components/MultiStepForm";
import { Helmet } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";

// Lazy load below-fold sections to improve FCP/LCP
const PainPointsSection = lazy(() => import("@/components/PainPointsSection").then(m => ({ default: m.PainPointsSection })));
const SolutionSection = lazy(() => import("@/components/SolutionSection").then(m => ({ default: m.SolutionSection })));
const QualificationSection = lazy(() => import("@/components/QualificationSection").then(m => ({ default: m.QualificationSection })));
const ResultsSection = lazy(() => import("@/components/ResultsSection").then(m => ({ default: m.ResultsSection })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Marketing para Marcenarias de Alto Padrão | Sistema de Vendas Premium</title>
        <meta
          name="description"
          content="Sistema previsível de vendas para marcenarias premium no Sul do Brasil. Feche projetos acima de R$ 25 mil atraindo clientes Classe A."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <main>
          <HeroSection onOpenForm={() => setIsFormOpen(true)} />
          <Suspense fallback={<div className="min-h-screen" />}>
            <PainPointsSection />
            <SolutionSection />
            <QualificationSection onOpenForm={() => setIsFormOpen(true)} />
            <ResultsSection />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>

      {/* Mobile sticky CTA bar */}
      <MobileStickyBar onClick={() => setIsFormOpen(true)} />

      {/* Form Modal */}
      <AnimatePresence>
        <FormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      </AnimatePresence>
    </>
  );
};

export default Index;
