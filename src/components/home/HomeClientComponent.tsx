"use client";

import CtaBannerSection from "@/components/CtaBannerSection";
import type { CtaBannerData } from "@/sanity/queries/ctaBanner";
import type { HomeData } from "@/sanity/queries/home";
import type { PostListItem } from "@/sanity/queries/posts";
import ChamadasSection from "./ChamadasSection";
import ContatoSection from "./ContatoSection";
import EcossistemaSection from "./EcossistemaSection";
import FaqSection from "./FaqSection";
import HeroSection from "./HeroSection";
import NoticiasSection from "./NoticiasSection";
import ParceirosSection from "./ParceirosSection";
import PilaresSection from "./PilaresSection";
import ProgramasSection from "./ProgramasSection";
import ResultadosSection from "./ResultadosSection";

type Props = {
  data: HomeData;
  ctaBanner: CtaBannerData;
  posts?: PostListItem[];
};

export default function HomeClientComponent({ data, ctaBanner, posts }: Props) {
  return (
    <main className="relative bg-brand-navy overflow-x-clip">
      {/* ── Fundo orgânico unificado — orbs flutuantes através de todas as seções ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[110vh] left-[-10%] w-[1100px] h-[1100px] rounded-full bg-brand-orange/[0.10] blur-[160px]" />
        <div className="absolute top-[310vh] right-[-10%] w-[1100px] h-[1100px] rounded-full bg-brand-orange/[0.10] blur-[160px]" />
        <div className="absolute top-[520vh] left-[20%] w-[1100px] h-[1100px] rounded-full bg-brand-orange/[0.10] blur-[160px]" />

        <div className="absolute top-[160vh] right-[-20%] w-[900px] h-[900px] rounded-full bg-[#004E69]/30 blur-[140px]" />
        <div className="absolute top-[420vh] left-[-10%] w-[800px] h-[800px] rounded-full bg-brand-teal/[0.05] blur-[140px]" />

        <div
          className="absolute top-[100vh] left-0 right-0 bottom-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-navy/20 to-brand-navy/40" />
      </div>

      {/* Seções Sanity — uma por arquivo em ./[NomeDaSecao]Section.tsx */}
      <HeroSection hero={data?.hero} />
      <ParceirosSection parceiros={data?.parceiros} />
      <EcossistemaSection ecossistema={data?.ecossistema} timeline={data?.timeline} />
      <PilaresSection pilares={data?.pilares} />
      <ProgramasSection programas={data?.programas} />
      <ChamadasSection chamadas={data?.chamadas} />

      {/* ── Light mode — Resultados + Notícias ── */}
      <div
        id="light-section"
        data-theme="light"
        className="relative z-10 bg-surface-soft overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[4%] -left-[12%] w-200 h-200 rounded-full bg-brand-orange/7 blur-[160px]" />
          <div className="absolute top-[26%] -right-[15%] w-225 h-225 rounded-full bg-brand-teal/5 blur-[180px]" />
          <div className="absolute top-[52%] -left-[15%] w-200 h-200 rounded-full bg-[#004E69]/5 blur-[160px]" />
          <div className="absolute top-[74%] -right-[10%] w-175 h-175 rounded-full bg-brand-orange/6 blur-[150px]" />
          <div className="absolute top-[92%] left-[15%] w-175 h-175 rounded-full bg-brand-teal/4 blur-[160px]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #0D2E38 1px, transparent 1px)",
              backgroundSize: "36px 36px",
              opacity: 0.06,
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)",
            }}
          />
        </div>
        <NoticiasSection posts={posts} />
        <ResultadosSection resultados={data?.resultados} />
      </div>

      {/* ── Dark mode final ── */}
      <ContatoSection />
      <FaqSection faq={data?.faq} />
      <CtaBannerSection data={ctaBanner} />
    </main>
  );
}
