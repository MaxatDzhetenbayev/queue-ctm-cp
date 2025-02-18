"use client";
import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { AxiosError } from "axios";
import {
  Box,
  Button,
  Center,
  Container,
  Input,
  Paper,
  Text,
  Title,
} from "@mantine/core";

export const LoginForm = () => {
  const [login, setlogin] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, error } = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      login,
      password,
    });
  };

  const getErrorMessage = (error: unknown) => {
    if (error instanceof AxiosError) {
      return error.response?.data?.message || error.message;
    }
    return "An unknown error occurred";
  };

  return (
    <Container size="xs" h="100vh">
      <Center h="100%">
        <Paper shadow="xs" p="xl">
          <Box>
            <Center>
              <Title order={1}>Добро пожаловать!</Title>
            </Center>
            <form
              onSubmit={handleLogin}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <Box>
                <Input
                  id="login"
                  value={login}
                  onChange={(e) => setlogin(e.target.value)}
                  required
                />
              </Box>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && (
                <Text c="red" fz="md">
                  {getErrorMessage(error)}
                </Text>
              )}
              <Button type="submit" fullWidth>
                Войти
              </Button>
            </form>
          </Box>
        </Paper>
      </Center>
    </Container>
  );
};
