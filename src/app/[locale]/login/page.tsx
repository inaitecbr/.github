import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Dropdown from '@/components/Dropdown'

export const metadata: Metadata = {
  title: 'Área Restrita',
  description:
    'Acesse a área restrita do Inaitec para acompanhar conteúdos e funcionalidades exclusivas por perfil.',
}

export default function LoginPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#0D2E38] flex items-center px-5 sm:px-10 lg:px-[108px] pt-[calc(108px+4vh)] pb-[4vh]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[12%] left-[-12%] w-[700px] h-[700px] rounded-full bg-[#FA8400]/15 blur-[120px]" />
        <div className="absolute bottom-[5%] right-[-10%] w-[680px] h-[680px] rounded-full bg-[#00C08B]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1240px] w-full">
        <section className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-4 md:p-6 shadow-2xl shadow-black/30 backdrop-blur-sm">
          <div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-2xl border border-white/10 bg-[#0D2E38]/90 p-6 sm:p-8 md:p-10">
              <div className="mb-8">
                <div className="mb-3 inline-flex items-center gap-2">
                  <span className="block h-px w-8 bg-[#FA8400]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                    Área Restrita
                  </span>
                </div>
                <h2 className="text-white text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
                  Bem-vindo de volta
                </h2>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">
                  Entre com seu perfil, e-mail e senha para acessar sua conta.
                </p>
              </div>

              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="perfil" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    Perfil
                  </label>
                  <Dropdown
                    id="perfil"
                    name="perfil"
                    placeholder="Selecione seu perfil"
                    options={[
                      { value: 'startup', label: 'Startup / Pequena empresa' },
                      { value: 'empresa', label: 'Grande ou média empresa' },
                      { value: 'investidor', label: 'Investidor' },
                      { value: 'universidade', label: 'Universidade / Governo' },
                    ]}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="exemplo@empresa.com"
                    className="h-12 rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#FA8400] focus:bg-white/[0.06]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="senha" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    Senha
                  </label>
                  <input
                    id="senha"
                    name="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    className="h-12 rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#FA8400] focus:bg-white/[0.06]"
                  />
                </div>

                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  title="Em breve"
                  className="mt-2 h-12 rounded-full bg-white/10 text-sm font-semibold text-white/40 cursor-not-allowed"
                >
                  Acessar
                </button>
              </form>

              <div className="mt-5 flex items-center justify-between text-xs text-white/45">
                <span>Copyright © {new Date().getFullYear()} Inaitec</span>
                <Link href="/privacidade" className="hover:text-white/70 transition-colors">
                  Política de Privacidade
                </Link>
              </div>
            </div>

            <div className="relative hidden md:block min-h-[min(640px,68vh)] overflow-hidden rounded-2xl">
              <Image
                src="/form-image.jpg"
                alt="Profissional em ambiente corporativo"
                fill
                className="object-cover"
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2E38]/80 via-[#0D2E38]/20 to-transparent" />
              <div className="absolute left-6 right-6 bottom-6 rounded-2xl border border-white/20 bg-white/[0.08] p-5 backdrop-blur-md">
                <div className="mb-3 text-[#F6C453]">★★★★★</div>
                <p className="text-white/85 text-sm leading-relaxed">
                  "Acompanhamos chamadas, mentorias e oportunidades do ecossistema em um só lugar.
                  A área restrita centraliza nossa rotina com o Inaitec."
                </p>
                <div className="mt-4 pt-4 border-t border-white/15">
                  <div className="text-white font-bold text-lg">Naira Oliveira</div>
                  <div className="text-white/60 text-sm mt-0.5">Fundadora · AgroSmart</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
