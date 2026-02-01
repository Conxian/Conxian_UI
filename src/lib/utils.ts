import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAmount(amount: string, decimals = 6): string {
  if (!amount) return "0";
  try {
    const padded = amount.padStart(decimals + 1, "0");
    const integerPart = padded.slice(0, -decimals);
    const fractionalPart = padded.slice(-decimals);
    // Remove trailing zeros from fractional part if needed, 
    // but for now keeping it simple as per original implementation
    return `${integerPart}.${fractionalPart}`;
  } catch {
    return "0";
  }
}

export function parseAmount(amount: string, decimals = 6): string {
  if (!amount) return "0";
  try {
    const [integerPart, fractionalPart = ""] = amount.split(".");
    const paddedFractional = fractionalPart
      .substring(0, decimals)
      .padEnd(decimals, "0");
    return BigInt(integerPart + paddedFractional).toString();
  } catch {
    return "0";
  }
}
