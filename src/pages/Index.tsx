import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PainPointsSection } from "@/components/PainPointsSection";
import { SolutionSection } from "@/components/SolutionSection";
import { QualificationSection } from "@/components/QualificationSection";
import { ResultsSection } from "@/components/ResultsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Método Premium | Marketing para Marcenarias de Alto Padrão no RS</title>
        <meta 
          name="description" 
          content="Sistema previsível de vendas para marcenarias premium no Rio Grande do Sul. Feche projetos acima de R$ 25 mil atraindo clientes Classe A." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <PainPointsSection />
          <SolutionSection />
          <QualificationSection />
          <ResultsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
