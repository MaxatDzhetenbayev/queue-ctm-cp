import { LogoutButton } from "@/features";
import { ProfileCard } from "@/widgets";
import { Box, Container, Flex, Paper } from "@mantine/core";
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

  if (user.role !== "MANAGER") {
    redirect("/403");
  }

  return (
    <Box bg="gray.0" h="100vh">
      <Flex direction="column" h="100%">
        <Box
          component="header"
          bg="#fff"
          style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}
        >
          <Container size="xl" h="100%">
            <Flex justify="flex-end" align="center" h="60px" gap={16}>
              <ProfileCard />
              <LogoutButton />
            </Flex>
          </Container>
        </Box>
        <Box component="main" py={30} flex={1}>
          <Paper
            p="lg"
            h="100%"
            mah={780}
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
