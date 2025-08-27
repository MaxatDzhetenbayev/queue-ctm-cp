import { Header } from "@/widgets";

export default function WithHeaderPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
