"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  LoginSchema,
  LoginSchemaType,
} from "@/modules/auth/domain/schemas/auth.shemas";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";

import { useUserLogin } from "../application/use-cases/use-login";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const { mutate } = useUserLogin();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: LoginSchemaType) => mutate(data))}
        className="w-2/3 space-y-6"
      >
        <h1>Вход в систему</h1>
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input placeholder="dzhetenbaev" {...field} />
              </FormControl>
              <FormDescription>Это ваше публичный логин.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormDescription>Это ваш секретный пароль.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer">
          Войти
        </Button>
      </form>
    </Form>
  );
};
