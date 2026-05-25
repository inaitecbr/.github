'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle, Newspaper, Users, Building2, Mail, Check, Clock, MapPin } from 'lucide-react'
import Dropdown from '@/components/Dropdown'
import FaqAccordion from '@/components/FaqAccordion'
import { Section, Container } from '@/components/Section'

interface Canal {
  titulo: string
  desc: string
  email: string
  whatsapp?: string
  horario: string
  icon: React.ReactNode
}

const CANAIS: Canal[] = [
  {
    titulo: 'Atendimento geral',
    desc: 'Dúvidas, informações e suporte ao ecossistema Inaitec.',
    email: 'contato@inaitec.org.br',
    whatsapp: '+55 48 3234-5678',
    horario: 'Seg–Sex, 8h–18h',
    icon: <MessageCircle strokeWidth={1.8} className="w-6 h-6" />,
  },
  {
    titulo: 'Imprensa',
    desc: 'Entrevistas, dados institucionais e releases para veículos de comunicação.',
    email: 'imprensa@inaitec.org.br',
    horario: 'Seg–Sex, 9h–17h',
    icon: <Newspaper strokeWidth={1.8} className="w-6 h-6" />,
  },
  {
    titulo: 'Parcerias corporativas',
    desc: 'Inovação aberta, co-investimento e programas customizados para sua empresa.',
    email: 'parcerias@inaitec.org.br',
    horario: 'Seg–Sex, 9h–18h',
    icon: <Users strokeWidth={1.8} className="w-6 h-6" />,
  },
  {
    titulo: 'Empresas instaladas',
    desc: 'Suporte operacional, contratos e serviços para residentes do Parque Pedra Branca.',
    email: 'residentes@inaitec.org.br',
    whatsapp: '+55 48 3234-5679',
    horario: 'Seg–Sex, 8h–18h',
    icon: <Building2 strokeWidth={1.8} className="w-6 h-6" />,
  },
]

const PERFIS = [
  { value: 'startup', label: 'Startup ou Pequena Empresa' },
  { value: 'empresa', label: 'Média ou Grande Empresa' },
  { value: 'investidor', label: 'Investidor' },
  { value: 'governo', label: 'Governo' },
  { value: 'universidade', label: 'Universidade' },
  { value: 'imprensa', label: 'Imprensa' },
  { value: 'outro', label: 'Outro' },
] as const

const FAQ_ITEMS = [
  {
    q: 'Quanto tempo leva a resposta após enviar o formulário?',
    a: 'Nossa equipe responde em até 2 dias úteis. Para assuntos urgentes, utilize o WhatsApp de atendimento geral disponível acima.',
  },
  {
    q: 'Como me candidato a uma vaga nos programas de aceleração?',
    a: 'As candidaturas são feitas durante os períodos de chamada aberta, publicados em /chamadas. Se quiser ser notificado das próximas chamadas, inscreva-se na newsletter.',
  },
  {
    q: 'Posso agendar uma visita ao Parque Pedra Branca?',
    a: 'Sim! Basta enviar o formulário nesta página selecionando o perfil adequado e mencionando o interesse em visita. Realizamos tours guiados de segunda a sexta, a partir das 10h.',
  },
  {
    q: 'O Inaitec oferece residência para empresas de fora de Santa Catarina?',
    a: 'Sim. Temos empresas de todo o Brasil e de outros países instaladas no Parque Pedra Branca. Acesse /traga-sua-empresa para conhecer as modalidades disponíveis.',
  },
  {
    q: 'Como funciona uma parceria de inovação aberta com o Inaitec?',
    a: 'As parcerias são estruturadas conforme o desafio e orçamento da empresa parceira — podem envolver aceleração de startups, hackathons ou programas customizados. Entre em contato pelo e-mail parcerias@inaitec.org.br para uma conversa inicial.',
  },
] as const

const ENDERECO_QUERY = 'Av.+Pedra+Branca,+25,+Palhoça,+SC'
const MAPA_EMBED = `https://www.google.com/maps?q=${ENDERECO_QUERY}&z=15&output=embed`

export default function FaleConoscoPage() {
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <main className="relative bg-[#0D2E38] overflow-x-clip">

      {/* Fundo orgânico */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[20vh] left-[-10%] w-[900px] h-[900px] rounded-full bg-[#FA8400]/[0.09] blur-[160px]" />
      </div>

      {/* ── 1. Hero + Formulário ─────────────────────────────────────── */}
      <section className="relative z-10 min-h-dvh flex items-center pt-[108px] pb-6 lg:pb-10">
        <Container className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-center">

          {/* Texto / Título */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                Fale conosco
              </span>
            </div>

            <h1 className="font-extrabold text-white text-display-xl leading-[1.1] tracking-tight">
              Bora conversar?
              <br />
              <span className="italic font-medium text-[#FA8400]">Estamos aqui.</span>
            </h1>

            <p className="mt-5 max-w-xl text-white/70 text-base leading-relaxed">
              Seja para agendar uma visita, propor parceria, tirar dúvidas ou falar com nossa
              equipe de imprensa — preencha o formulário ao lado e nossa equipe responde em até{' '}
              <span className="text-white font-semibold">2 dias úteis</span>.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="mailto:contato@inaitec.org.br"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                <Mail strokeWidth={1.8} className="w-4 h-4 text-[#FA8400]" />
                contato@inaitec.org.br
              </a>
            </div>
          </div>

          {/* Formulário */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5 sm:p-7">
            {enviado ? (
              <div className="py-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#00C08B]/20 text-[#00C08B] mx-auto mb-6">
                  <Check strokeWidth={2} className="w-8 h-8" />
                </div>
                <h3 className="text-white font-bold text-2xl mb-3">Mensagem enviada!</h3>
                <p className="text-white/65 leading-relaxed">
                  Nossa equipe responde em até 2 dias úteis. Fique de olho na caixa de entrada.
                </p>
                <button
                  onClick={() => setEnviado(false)}
                  className="mt-8 text-sm font-semibold text-[#FA8400] hover:text-[#FF9B26] transition-colors"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="contato-nome" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5">
                      Nome
                    </label>
                    <input
                      id="contato-nome"
                      name="nome"
                      type="text"
                      required
                      placeholder="João"
                      className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FA8400]/60 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contato-sobrenome" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5">
                      Sobrenome
                    </label>
                    <input
                      id="contato-sobrenome"
                      name="sobrenome"
                      type="text"
                      required
                      placeholder="Silva"
                      className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FA8400]/60 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="contato-email" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5">
                      E-mail
                    </label>
                    <input
                      id="contato-email"
                      name="email"
                      type="email"
                      required
                      placeholder="joao@empresa.com"
                      className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FA8400]/60 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contato-telefone" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5">
                      Telefone
                    </label>
                    <input
                      id="contato-telefone"
                      name="telefone"
                      type="tel"
                      placeholder="+55 48 9 0000-0000"
                      className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FA8400]/60 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="perfil" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5">
                    Perfil
                  </label>
                  <Dropdown
                    id="perfil"
                    name="perfil"
                    placeholder="Selecione seu perfil"
                    options={[...PERFIS]}
                  />
                </div>

                <div>
                  <label htmlFor="contato-mensagem" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5">
                    Mensagem
                  </label>
                  <textarea
                    id="contato-mensagem"
                    name="mensagem"
                    required
                    rows={3}
                    placeholder="Descreva como podemos ajudar..."
                    className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FA8400]/60 focus:bg-white/[0.08] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center rounded-full bg-[#FA8400] text-white text-sm font-semibold px-8 py-3.5 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-[#FA8400]/40 transition-all duration-300 shadow-lg shadow-[#FA8400]/25"
                >
                  Enviar mensagem
                </button>

                <p className="text-[11px] text-white/45 leading-relaxed">
                  Ao enviar este formulário, você concorda com o tratamento dos seus dados pelo
                  Inaitec exclusivamente para responder a esta solicitação, conforme nossa{' '}
                  <Link href="/politica-de-privacidade" className="text-white/70 underline underline-offset-2 hover:text-[#FA8400] transition-colors">
                    Política de Privacidade
                  </Link>{' '}
                  e a LGPD (Lei nº 13.709/2018).
                </p>
              </form>
            )}
          </div>
        </Container>
      </section>

      {/* ── 2. Canais de contato ─────────────────────────────────────── */}
      <Section theme="light" padding="md">
          <div className="max-w-2xl mb-12">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                Canais de contato
              </span>
            </div>
            <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
              Fale com a equipe{' '}
              <span className="italic font-medium text-[#FA8400]">certa</span>.
            </h2>
            <p className="mt-5 text-[#0D2E38]/65 text-base leading-relaxed">
              Cada demanda tem um time dedicado — escolha o canal abaixo para chegar mais rápido a quem pode ajudar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CANAIS.map((c) => (
              <article
                key={c.titulo}
                className="group rounded-2xl bg-white border border-[#E8E6E1] p-7 flex flex-col transition-all duration-300 hover:border-[#FA8400]/30 hover:shadow-xl hover:shadow-[#0D2E38]/10 hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FA8400]/10 text-[#FA8400] mb-5">
                  {c.icon}
                </div>

                <h3 className="font-bold text-lg leading-tight mb-1.5">{c.titulo}</h3>
                <p className="text-sm text-[#0D2E38]/60 leading-relaxed mb-5">{c.desc}</p>

                <ul className="mt-auto -mx-2 divide-y divide-[#E8E6E1]/70">
                  <li>
                    <a
                      href={`mailto:${c.email}`}
                      className="flex items-center gap-3 px-2 py-3 hover:bg-[#FA8400]/[0.04] rounded-md transition-colors"
                    >
                      <span className="shrink-0 w-8 h-8 rounded-full bg-[#FA8400]/10 flex items-center justify-center text-[#FA8400]">
                        <Mail strokeWidth={1.8} className="w-3.5 h-3.5" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0D2E38]/45 leading-none mb-0.5">
                          E-mail
                        </div>
                        <div className="font-semibold text-[13px] text-[#0D2E38] leading-tight truncate">
                          {c.email}
                        </div>
                      </div>
                    </a>
                  </li>

                  {c.whatsapp && (
                    <li>
                      <a
                        href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-2 py-3 hover:bg-[#00C08B]/[0.05] rounded-md transition-colors"
                      >
                        <span className="shrink-0 w-8 h-8 rounded-full bg-[#00C08B]/10 flex items-center justify-center text-[#00C08B]">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                        </span>
                        <div className="min-w-0">
                          <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0D2E38]/45 leading-none mb-0.5">
                            WhatsApp
                          </div>
                          <div className="font-semibold text-[13px] text-[#0D2E38] leading-tight truncate">
                            {c.whatsapp}
                          </div>
                        </div>
                      </a>
                    </li>
                  )}

                  <li className="flex items-center gap-3 px-2 py-3">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-[#0D2E38]/[0.06] flex items-center justify-center text-[#0D2E38]/55">
                      <Clock strokeWidth={1.8} className="w-3.5 h-3.5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0D2E38]/45 leading-none mb-0.5">
                        Horário
                      </div>
                      <div className="font-semibold text-[13px] text-[#0D2E38]/75 leading-tight">
                        {c.horario}
                      </div>
                    </div>
                  </li>
                </ul>
              </article>
            ))}
          </div>

      </Section>

      {/* ── 3. Endereço + Mapa ───────────────────────────────────────── */}
      <Section
        theme="light"
        padding="none"
        className="pt-16 pb-28"
        containerClassName="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center"
      >
          <div>
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                Como chegar
              </span>
            </div>
            <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
              Venha nos <span className="italic font-medium text-[#FA8400]">visitar</span>.
            </h2>
            <p className="mt-5 text-[#0D2E38]/65 text-base leading-relaxed max-w-lg">
              Nossa sede fica na Cidade Universitária Pedra Branca, em Palhoça/SC — um polo de
              inovação a poucos minutos do aeroporto, da BR-101 e do centro de Florianópolis.
            </p>

            <div className="mt-10 space-y-8">
              <div className="flex gap-5">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FA8400]/10 text-[#FA8400] shrink-0">
                  <MapPin strokeWidth={1.8} className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0D2E38]/45 mb-1">
                    Endereço
                  </div>
                  <div className="font-bold text-lg leading-tight">Av. Pedra Branca, 25</div>
                  <div className="text-[#0D2E38]/60 text-sm mt-1 leading-relaxed">
                    Cidade Universitária Pedra Branca · Palhoça — SC, 88137-272
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Mapa real */}
          <div className="relative rounded-3xl overflow-hidden border border-[#E8E6E1] bg-white aspect-[5/4] lg:aspect-[6/5] shadow-xl shadow-[#0D2E38]/10">
            <iframe
              title="Mapa do Inaitec — Av. Pedra Branca, 25, Palhoça/SC"
              src={MAPA_EMBED}
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
      </Section>

      {/* ── 4. FAQ ───────────────────────────────────────────────────── */}
      <Section padding="md" containerClassName="grid lg:grid-cols-[400px_1fr] gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                Perguntas frequentes
              </span>
            </div>
            <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
              Ainda tem <span className="italic font-medium text-[#FA8400]">dúvidas?</span>
            </h2>
            <p className="mt-6 text-white/65 text-base leading-relaxed">
              Caso não encontre o que precisa abaixo, use o formulário ou fale diretamente
              com nossa equipe via WhatsApp.
            </p>
          </div>

          <FaqAccordion items={[...FAQ_ITEMS]} />
      </Section>
    </main>
  )
}
