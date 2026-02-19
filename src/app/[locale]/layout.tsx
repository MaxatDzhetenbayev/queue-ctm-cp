import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ToastContainer } from "react-toastify";

import { routing } from "@/shared/configs/i18/routing";
import { QueryProvider } from "@/shared/providers";

import "@/shared/configs";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Панель управления очередью",
};

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Сообщаем next-intl, какой locale используется в этом запросе
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale}>
      <QueryProvider>
        <main
          className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10`}
        >
          {children}
        </main>
      </QueryProvider>
      <ToastContainer />
    </NextIntlClientProvider>
  );
}

