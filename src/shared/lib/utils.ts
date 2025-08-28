import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Объединяет классы Tailwind в одну строку
 * @param inputs - Массив классов
 * @returns Строка с объединенными классами
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
