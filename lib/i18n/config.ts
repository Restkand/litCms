export const locales = ["id", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "id"
export const LOCALE_COOKIE = "nuii-lang"

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "id" || value === "en"
}
