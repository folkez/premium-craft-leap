import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { PainPointsSection } from "@/components/PainPointsSection";
import { SolutionSection } from "@/components/SolutionSection";
import { QualificationSection } from "@/components/QualificationSection";
import { ResultsSection } from "@/components/ResultsSection";
import { FormModal, MobileStickyBar } from "@/components/MultiStepForm";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";

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
          <PainPointsSection />
          <SolutionSection />
          <QualificationSection onOpenForm={() => setIsFormOpen(true)} />
          <ResultsSection />
        </main>
        <Footer />
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
