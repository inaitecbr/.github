import BrandPattern from "@/components/BrandPattern";
import { Container } from "@/components/Section";
import type { ProgramasHero } from "@/sanity/queries/programa";
import Image from "next/image";

type Props = {
  hero?: ProgramasHero;
  count: number;
};

export default function HeroSection({ hero, count }: Props) {
  if (!hero) return null;

  return (
    <section className="relative z-10 min-h-[640px] lg:h-[700px] pt-[108px] pb-16 overflow-hidden">
      <BrandPattern
        variant="dots"
        color="var(--color-brand-orange)"
        className="absolute top-32 right-8 w-72 h-72 opacity-25 pointer-events-none"
      />

      <Container className="relative h-full grid lg:grid-cols-[1.1fr_1fr] gap-16 items-stretch">
        <div className="flex flex-col justify-center">
          {hero.eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {hero.eyebrow}
              </span>
            </div>
          )}

          <h1 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
            {/* titleStart pode conter "{count}" — substituímos pelo número real */}
            {hero.titleStart?.replace("{count}", String(count))}
            {hero.titleHighlight && (
              <>
                <br />
                <span className="italic font-medium text-brand-orange">{hero.titleHighlight}</span>
              </>
            )}
            {!hero.titleHighlight && "."}
          </h1>

          {hero.subtitle && (
            <p className="mt-6 max-w-xl text-white/70 text-base leading-relaxed">{hero.subtitle}</p>
          )}
        </div>

        <div className="relative aspect-[4/3] lg:aspect-auto rounded-3xl overflow-hidden">
          <Image
            src={hero.heroImageUrl ?? "/imagens-destaques/inaitec5.jpg"}
            alt="Programas Inaitec — encontros e mentoria"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/60 via-transparent to-transparent" />
        </div>
      </Container>
    </section>
  );
}
