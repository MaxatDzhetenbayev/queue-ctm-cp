"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useEmployeeQuery = (delay: number = 500) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (inputValue.trim()) {
        params.set("query", inputValue);
      } else {
        params.delete("query");
      }

      router.replace(`?${params.toString()}`);
      setDebouncedQuery(inputValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [inputValue, delay, router, searchParams]);

  return {
    inputValue,
    setInputValue,
    debouncedQuery,
  };
};
