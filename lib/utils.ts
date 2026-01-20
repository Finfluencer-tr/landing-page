import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Language } from "./dictionary";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get locale string for Intl APIs based on language
 */
export function getLocale(language: Language): string {
  const localeMap: Record<Language, string> = {
    en: "en-US",
    tr: "tr-TR",
    zh: "zh-CN",
    ar: "ar-SA"
  };
  return localeMap[language] || "en-US";
}

/**
 * Format date based on language
 */
export function formatDate(dateString: string, language: Language, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateString);
  const locale = getLocale(language);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Intl.DateTimeFormat(locale, options || defaultOptions).format(date);
}

/**
 * Format date for charts (shorter format)
 */
export function formatDateShort(dateString: string, language: Language): string {
  const date = new Date(dateString);
  const locale = getLocale(language);
  return new Intl.DateTimeFormat(locale, {
    month: 'numeric',
    day: 'numeric'
  }).format(date);
}

/**
 * Format date with time for charts
 */
export function formatDateTime(dateString: string, language: Language): string {
  const date = new Date(dateString);
  const locale = getLocale(language);
  return new Intl.DateTimeFormat(locale, {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}
