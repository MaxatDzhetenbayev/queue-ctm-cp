"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export const queryClient = new QueryClient();

export function QueryProvider({ child }: { child: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{child}</QueryClientProvider>
  );
}
