import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/shared";
import {
  ColorSchemeScript,
  createTheme,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Панель управления очередью",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = createTheme({
    breakpoints: {
      xl: "1640px",
    },
  });
  return (
    <html lang="ru" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <QueryProvider child={children} />
        </MantineProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
