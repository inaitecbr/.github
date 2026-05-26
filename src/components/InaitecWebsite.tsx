"use client";

import CtaBannerSection from "@/components/home/CtaBannerSection";
import ContatoSection from "@/components/home/ContatoSection";
import FaqSection from "@/components/home/FaqSection";
import NoticiasSection from "@/components/home/NoticiasSection";

export default function InaitecWebsite() {
  return (
    <>
      {/* ══════════════ LIGHT MODE — Notícias ══════════════ */}
      <div
        id="light-section"
        data-theme="light"
        className="relative z-10 bg-[#F5F4EF] overflow-hidden"
      >
        {/* Camada decorativa global do light mode */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[4%] -left-[12%] w-[800px] h-[800px] rounded-full bg-brand-orange/[0.07] blur-[160px]" />
          <div className="absolute top-[26%] -right-[15%] w-[900px] h-[900px] rounded-full bg-brand-teal/[0.05] blur-[180px]" />
          <div className="absolute top-[52%] -left-[15%] w-[800px] h-[800px] rounded-full bg-[#004E69]/[0.05] blur-[160px]" />
          <div className="absolute top-[74%] -right-[10%] w-[700px] h-[700px] rounded-full bg-brand-orange/[0.06] blur-[150px]" />
          <div className="absolute top-[92%] left-[15%] w-[700px] h-[700px] rounded-full bg-brand-teal/[0.04] blur-[160px]" />
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

        <NoticiasSection />
      </div>

      {/* ══════════════ DARK MODE FINAL ══════════════ */}
      <ContatoSection />
      <FaqSection />
      <CtaBannerSection />
    </>
  );
}
