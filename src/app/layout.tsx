import type { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

// В Next.js корневой layout обязан содержать <html> и <body>.
// Локаль и провайдеры задаются в app/[locale]/layout.tsx.
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
