import CtaFinalSection from "@/components/CtaFinalSection";
import type { EmpresaItem } from "@/sanity/queries/empresas";
import type { EmpresasInstaladasPageData } from "@/sanity/queries/empresasInstaladas";
import CatalogoSection from "./CatalogoSection";
import HeroSection from "./HeroSection";

type Props = {
  empresas: EmpresaItem[];
  pageData: EmpresasInstaladasPageData;
};

export default function EmpresasInstaladasClientComponent({ empresas, pageData }: Props) {
  return (
    <main className="bg-brand-navy">
      <HeroSection hero={pageData?.hero} />
      <CatalogoSection empresas={empresas} />
      <CtaFinalSection data={pageData?.ctaFinal} />
    </main>
  );
}
