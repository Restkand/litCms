import { cookies } from "next/headers"
import { defaultLocale, LOCALE_COOKIE, isLocale, type Locale } from "./config"
import { id, type Dictionary } from "@/messages/id"
import { en } from "@/messages/en"

export type { Locale } from "./config"
export type { Dictionary } from "@/messages/id"

const dictionaries: Record<Locale, Dictionary> = { id, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale]
}

/** Baca locale aktif dari cookie (server components / generateMetadata). */
export async function getLocale(): Promise<Locale> {
  const store = await cookies()
  const value = store.get(LOCALE_COOKIE)?.value
  return isLocale(value) ? value : defaultLocale
}

/** Helper gabungan: { locale, dict, t }. */
export async function getI18n(): Promise<{ locale: Locale; dict: Dictionary }> {
  const locale = await getLocale()
  return { locale, dict: getDictionary(locale) }
}
