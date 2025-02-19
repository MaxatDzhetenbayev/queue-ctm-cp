import { LogoutButton } from "@/features";
import { ProfileCard } from "@/widgets";
import { Box, Container, Flex, Paper } from "@mantine/core";

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box bg="gray.0" h="100vh">
      <Flex direction="column" h="100%">
        <Box
          component="header"
          bg="#fff"
          style={{ height: 64, boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}
        >
          <Container size="xl" h="100%">
            <Flex justify="flex-end" align="center" h="100%" gap={16}>
              <ProfileCard />
              <LogoutButton />
            </Flex>
          </Container>
        </Box>

        <Box component="main" flex={1} h="100%" py={40}>
          <Paper
            p="lg"
            h="100%"
            style={{
              maxWidth: "1640px",
              margin: "0 auto",
              overflow: "hidden",
            }}
          >
            {children}
          </Paper>
        </Box>
      </Flex>
    </Box>
  );
}
