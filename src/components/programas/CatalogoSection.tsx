"use client";

import { Section } from "@/components/Section";
import SidebarFilter from "@/components/SidebarFilter";
import type {
  EntradaKey,
  EstagioKey,
  ProgramaCard,
  PublicoKey,
  StatusKey,
} from "@/sanity/queries/programa";
import { effectiveStatusKey } from "@/lib/programa-status";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

// ─── Key → Label (display) ────────────────────────────────────────

const PUBLICO_LABEL: Record<PublicoKey, string> = {
  startups: "Startups e Pequenas Empresas",
  empresas: "Grandes e Médias Empresas",
  universidades: "Universidades e Governo",
  investidores: "Investidores",
};

const ESTAGIO_LABEL: Record<EstagioKey, string> = {
  ideacao: "Ideação",
  "pre-aceleracao": "Pré-aceleração",
  aceleracao: "Aceleração",
  crescimento: "Crescimento",
  internacionalizacao: "Internacionalização",
  pesquisa: "Pesquisa",
  operacao: "Operação",
};

const ENTRADA_LABEL: Record<EntradaKey, string> = {
  edital: "Edital",
  "inscricao-continua": "Inscrição contínua",
  convite: "Convite",
  parceria: "Parceria",
};

const STATUS_SHORT: Record<StatusKey, string> = {
  aberta: "Aberto",
  "em-breve": "Em breve",
  fechada: "Fechado",
  "fluxo-continuo": "Contínuo",
};

// ─── Cores ────────────────────────────────────────────────────────

const PUBLICO_COLORS: Record<PublicoKey, string> = {
  startups: "var(--color-brand-orange)",
  empresas: "var(--color-brand-teal)",
  universidades: "#4A9EE0",
  investidores: "#E9A84A",
};

const STATUS_COLOR: Record<StatusKey, string> = {
  aberta: "var(--color-brand-teal)",
  "em-breve": "var(--color-brand-orange)",
  fechada: "#94A3B8",
  "fluxo-continuo": "var(--color-brand-orange)",
};

// ─── Filter options (keys, ordered) ──────────────────────────────

const PUBLICO_KEYS: PublicoKey[] = ["startups", "empresas", "universidades", "investidores"];
const ESTAGIO_KEYS: EstagioKey[] = [
  "ideacao",
  "pre-aceleracao",
  "aceleracao",
  "crescimento",
  "internacionalizacao",
  "pesquisa",
  "operacao",
];
const ENTRADA_KEYS: EntradaKey[] = ["edital", "inscricao-continua", "convite", "parceria"];
const STATUS_KEYS: StatusKey[] = ["aberta", "em-breve", "fluxo-continuo", "fechada"];

// ─── Helpers ──────────────────────────────────────────────────────

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

// ─── Component ────────────────────────────────────────────────────

type Props = { programas: ProgramaCard[] };

export default function CatalogoSection({ programas: programasProp }: Props) {
  const [publicos, setPublicos] = useState<PublicoKey[]>([]);
  const [estagios, setEstagios] = useState<EstagioKey[]>([]);
  const [entradas, setEntradas] = useState<EntradaKey[]>([]);
  const [statuses, setStatuses] = useState<StatusKey[]>([]);

  // Status efetivo — "aberta" com deadline vencido vira "fechada" (badge e filtro)
  const programas = useMemo(
    () => programasProp.map((p) => ({ ...p, statusKey: effectiveStatusKey(p) })),
    [programasProp],
  );

  const filtrados = useMemo(
    () =>
      programas.filter(
        (p) =>
          (publicos.length === 0 || (p.publicoKey && publicos.includes(p.publicoKey))) &&
          (estagios.length === 0 || (p.estagioKey && estagios.includes(p.estagioKey))) &&
          (entradas.length === 0 || (p.entradaKey && entradas.includes(p.entradaKey))) &&
          (statuses.length === 0 || (p.statusKey && statuses.includes(p.statusKey))),
      ),
    [programas, publicos, estagios, entradas, statuses],
  );

  const limparFiltros = () => {
    setPublicos([]);
    setEstagios([]);
    setEntradas([]);
    setStatuses([]);
  };

  const filtrosAtivos = publicos.length + estagios.length + entradas.length + statuses.length;

  const contagens = useMemo(() => {
    const base =
      publicos.length === 0
        ? programas
        : programas.filter((p) => p.publicoKey && publicos.includes(p.publicoKey));

    const make = <K extends string>(
      keyFn: (p: ProgramaCard) => K | undefined,
      source: ProgramaCard[],
    ) => {
      const m: Record<string, number> = {};
      source.forEach((p) => {
        const v = keyFn(p);
        if (v) m[v] = (m[v] || 0) + 1;
      });
      return m;
    };

    return {
      publico: make((p) => p.publicoKey, programas),
      estagio: make((p) => p.estagioKey, base),
      entrada: make((p) => p.entradaKey, base),
      status: make((p) => p.statusKey, base),
    };
  }, [programas, publicos]);

  return (
    <Section theme="light" padding="md">
      <div className="grid items-start gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
        {/* Sidebar de filtros */}
        <aside className="lg:sticky lg:top-[88px]">
          {/* Mobile: collapse */}
          <details className="group overflow-hidden rounded-2xl border border-border bg-white lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
                Filtros
                {filtrosAtivos > 0 && (
                  <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-orange px-1.5 text-[10px] font-bold text-white">
                    {filtrosAtivos}
                  </span>
                )}
              </span>
              <ChevronDown
                strokeWidth={2.5}
                className="h-4 w-4 text-brand-navy/50 transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="scrollbar-subtle flex max-h-[60vh] flex-col overflow-x-hidden overflow-y-auto overscroll-contain border-t border-border px-5 pb-5 pt-1">
              <SidebarFilter
                label="Público"
                options={PUBLICO_KEYS}
                active={publicos}
                onChange={(v) => setPublicos((prev) => toggle(prev, v as PublicoKey))}
                counts={contagens.publico}
                labels={PUBLICO_LABEL}
              />
              <SidebarFilter
                label="Status"
                options={STATUS_KEYS}
                active={statuses}
                onChange={(v) => setStatuses((prev) => toggle(prev, v as StatusKey))}
                counts={contagens.status}
                labels={STATUS_SHORT}
              />
              <SidebarFilter
                label="Estágio"
                options={ESTAGIO_KEYS}
                active={estagios}
                onChange={(v) => setEstagios((prev) => toggle(prev, v as EstagioKey))}
                counts={contagens.estagio}
                labels={ESTAGIO_LABEL}
              />
              <SidebarFilter
                label="Entrada"
                options={ENTRADA_KEYS}
                active={entradas}
                onChange={(v) => setEntradas((prev) => toggle(prev, v as EntradaKey))}
                counts={contagens.entrada}
                labels={ENTRADA_LABEL}
              />
              {filtrosAtivos > 0 && (
                <button
                  onClick={limparFiltros}
                  className="mt-3 self-start text-[12px] font-semibold text-brand-orange hover:underline"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          </details>

          {/* Desktop: sidebar visível */}
          <div className="scrollbar-subtle hidden lg:flex lg:max-h-[calc(100dvh-7rem)] lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:overscroll-contain lg:pr-2">
            <div className="mb-5 flex items-baseline justify-between">
              <span className="text-lg font-extrabold tracking-tight text-brand-navy">Filtros</span>
              <button
                onClick={limparFiltros}
                disabled={filtrosAtivos === 0}
                className="text-[12px] font-semibold text-brand-navy/45 transition-colors hover:text-brand-orange disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-brand-navy/45"
              >
                Limpar tudo
              </button>
            </div>
            <div className="flex flex-col">
              <SidebarFilter
                label="Público"
                options={PUBLICO_KEYS}
                active={publicos}
                onChange={(v) => setPublicos((prev) => toggle(prev, v as PublicoKey))}
                counts={contagens.publico}
                labels={PUBLICO_LABEL}
              />
              <SidebarFilter
                label="Status"
                options={STATUS_KEYS}
                active={statuses}
                onChange={(v) => setStatuses((prev) => toggle(prev, v as StatusKey))}
                counts={contagens.status}
                labels={STATUS_SHORT}
              />
              <SidebarFilter
                label="Estágio"
                options={ESTAGIO_KEYS}
                active={estagios}
                onChange={(v) => setEstagios((prev) => toggle(prev, v as EstagioKey))}
                counts={contagens.estagio}
                labels={ESTAGIO_LABEL}
              />
              <SidebarFilter
                label="Entrada"
                options={ENTRADA_KEYS}
                active={entradas}
                onChange={(v) => setEntradas((prev) => toggle(prev, v as EntradaKey))}
                counts={contagens.entrada}
                labels={ENTRADA_LABEL}
              />
            </div>
          </div>
        </aside>

        {/* Grid principal */}
        <div>
          <div className="mb-6 flex items-baseline justify-between border-b border-brand-navy/10 pb-4">
            <h2 className="text-base font-bold text-brand-navy">
              <span className="text-brand-orange">{filtrados.length}</span> programa
              {filtrados.length === 1 ? "" : "s"}
            </h2>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-navy/45">
              Catálogo completo
            </span>
          </div>

          {filtrados.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-brand-navy/15 bg-white/50 p-12 text-center">
              <div className="mb-2 text-lg font-bold text-brand-navy">
                Sem programas pra essa combinação.
              </div>
              <p className="mx-auto mb-6 max-w-md text-sm text-brand-navy/60">
                Ajuste algum filtro ou fale com a gente — montamos uma jornada sob medida pra sua
                empresa.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={limparFiltros}
                  className="inline-flex items-center rounded-full border border-brand-navy/15 bg-white px-5 py-3 text-sm font-semibold text-brand-navy transition-all hover:border-brand-orange hover:text-brand-orange"
                >
                  Limpar filtros
                </button>
                <Link
                  href="/fale-conosco"
                  className="inline-flex items-center rounded-full bg-brand-orange px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#FF9B26]"
                >
                  Falar com especialista
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtrados.map((p) => {
                const accent = p.publicoKey
                  ? PUBLICO_COLORS[p.publicoKey]
                  : "var(--color-brand-orange)";
                const statusColor = p.statusKey
                  ? STATUS_COLOR[p.statusKey]
                  : "var(--color-brand-teal)";
                const isEmBreve = p.statusKey === "em-breve";
                const isAberta = p.statusKey === "aberta";

                return (
                  <Link
                    key={p._id}
                    href={`/programas/${p.slug ?? ""}`}
                    style={{ "--card-accent": accent } as React.CSSProperties}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--card-accent)] hover:shadow-xl hover:shadow-brand-navy/10"
                  >
                    {/* Imagem */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-border">
                      {p.imageUrl ? (
                        <Image
                          src={p.imageUrl}
                          alt={p.name ?? ""}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/80 to-brand-dark/90" />
                      )}
                      {/* Badge em breve sobre a imagem */}
                      {isEmBreve && (
                        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-lg">
                          <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                          Em breve
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      {p.publicoKey && (
                        <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-brand-navy/70">
                          <span
                            className="block h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: accent }}
                          />
                          {PUBLICO_LABEL[p.publicoKey]}
                        </span>
                      )}

                      <h3 className="text-xl font-extrabold leading-tight text-brand-navy">
                        {p.name}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-brand-navy/65">{p.desc}</p>

                      <dl className="mt-2 grid grid-cols-2 gap-4 border-t border-border pt-4">
                        <div className="flex flex-col gap-0.5">
                          <dt className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-navy/45">
                            Estágio
                          </dt>
                          <dd className="text-[12px] font-semibold text-brand-navy">
                            {p.estagioKey ? ESTAGIO_LABEL[p.estagioKey] : "—"}
                          </dd>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <dt className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-navy/45">
                            Status
                          </dt>
                          {p.statusKey && (
                            <dd
                              className="inline-flex items-center gap-1.5 text-[12px] font-semibold"
                              style={{ color: statusColor }}
                            >
                              <span
                                className={`block h-1.5 w-1.5 rounded-full ${isAberta ? "animate-pulse" : ""}`}
                                style={{ backgroundColor: statusColor }}
                              />
                              {STATUS_SHORT[p.statusKey]}
                            </dd>
                          )}
                        </div>
                      </dl>
                    </div>

                    {/* Accent stripe — hover only */}
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                      style={{ backgroundColor: accent }}
                    />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
