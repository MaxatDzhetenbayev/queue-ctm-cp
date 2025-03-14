import { LogoutButton } from "@/features";
import { ProfileCard } from "@/widgets";
import { Box, Container, Flex, Title } from "@mantine/core";
// import { WithSideBarTemplate } from "../tempaltes/WithSideBarTemplate";

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container size="lg" px={20} mt={40}>
      <Flex mb={20} align="center" justify="space-between">
        <Box>
          <Title order={1}> Центр Мобильного Трудоустройства</Title>
          <Title size="md" c="gray" fw="normal">
            Система управления онлайн очередью
          </Title>
        </Box>
        <Flex align="center" gap={20}>
          <ProfileCard />
          <LogoutButton />
        </Flex>
      </Flex>
      {children}
    </Container>
  );
}
