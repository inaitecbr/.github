import LayoutShell from "@/components/LayoutShell";
import { routing } from "@/i18n/routing";
import { getHeaderPrograms } from "@/sanity/queries/headerPrograms";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Inaitec",
    default: "Inaitec — Hub de Inovação e Tecnologia",
  },
  description:
    "Hub brasileiro de inovação e tecnologia focado em aceleração de startups, inovação aberta e desenvolvimento do ecossistema Pedra Branca em Palhoça, SC.",
  icons: {
    icon: "/logo-fav.png",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const [messages, headerPrograms] = await Promise.all([
    getMessages(),
    getHeaderPrograms({ locale }),
  ]);
  const htmlLang = locale === "pt" ? "pt-BR" : locale;

  return (
    <html lang={htmlLang} className={jakarta.variable}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LayoutShell headerPrograms={headerPrograms}>{children}</LayoutShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
