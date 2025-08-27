import { Header } from "@/widgets";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header showNavigation={false} />
      {children}
    </>
  );
}
