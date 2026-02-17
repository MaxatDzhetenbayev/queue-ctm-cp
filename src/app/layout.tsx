import type { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

// Корневой layout нужен Next.js, но вся разметка и провайдеры
// находятся в `app/[locale]/layout.tsx`
export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
