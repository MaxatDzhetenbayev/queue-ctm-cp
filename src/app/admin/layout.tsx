import { WithSideBarTemplate } from "../tempaltes/WithSideBarTemplate";

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <WithSideBarTemplate>{children}</WithSideBarTemplate>;
}
