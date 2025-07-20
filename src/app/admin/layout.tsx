import { LogoutButton } from "@/features";
import { checkAuth } from "@/features/auth";
import { ProfileCard, Navigation } from "@/widgets";
import { Card, Container, Flex } from "@mantine/core";
import { cookies } from 'next/headers';

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies().toString();
  checkAuth(cookie);

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
