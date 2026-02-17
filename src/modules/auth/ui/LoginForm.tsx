"use client";

import { useTranslations } from "next-intl";
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
  const t = useTranslations("auth.login");
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
        <h1>{t("title")}</h1>
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("username")}</FormLabel>
              <FormControl>
                <Input placeholder={t("usernamePlaceholder")} {...field} />
              </FormControl>
              <FormDescription>{t("usernameDescription")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <Input type="password" placeholder={t("passwordPlaceholder")} {...field} />
              </FormControl>
              <FormDescription>{t("passwordDescription")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer">
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
};
