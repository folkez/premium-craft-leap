import { HeroSection } from "@/components/HeroSection";
import { PainPointsSection } from "@/components/PainPointsSection";
import { SolutionSection } from "@/components/SolutionSection";
import { QualificationSection } from "@/components/QualificationSection";
import { ResultsSection } from "@/components/ResultsSection";
import { MultiStepForm } from "@/components/MultiStepForm";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
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
          <HeroSection />
          <PainPointsSection />
          <SolutionSection />
          <QualificationSection />
          <ResultsSection />
          <MultiStepForm />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
