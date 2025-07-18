"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1 className="text-4xl font-bold">404 - Страница не найдена</h1>
      <p className="text-gray-600 mt-2">Такой страницы не существует.</p>
      <button
        className="text-blue-500 mt-4 hover:underline"
        onClick={() => router.back()}
      >
        Вернуться назад
      </button>
    </div>
  );
}
