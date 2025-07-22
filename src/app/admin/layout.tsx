import { LogoutButton } from "@/features";
import { ProfileCard, Navigation } from "@/widgets";
import { Card, Container, Flex } from "@mantine/core";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies().toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      credentials: "include",
    }
  );
  const user = await res.json();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <Container size={1400} px={20} mt={40}>
      <Card withBorder mb={20}>
        <Flex align="center" justify="space-between">
          <Navigation />
          <Flex align="center" gap={20}>
            <ProfileCard />
            <LogoutButton />
          </Flex>
        </Flex>
      </Card>
      {children}
    </Container>
  );
}
