import type { Locale } from "@/lib/i18n/config"

/** Field bahasa pada Article yang relevan untuk tampilan publik. */
export interface ArticleLangFields {
  title: string
  excerpt?: string | null
  content?: string
  metaTitle?: string | null
  metaDescription?: string | null
  titleEn?: string | null
  excerptEn?: string | null
  contentEn?: string | null
  metaTitleEn?: string | null
  metaDescriptionEn?: string | null
}

/**
 * Pilih konten artikel sesuai locale. Saat EN, pakai field *En bila terisi;
 * jika kosong, fallback ke versi Indonesia.
 */
/** True bila artikel sudah punya versi Inggris (minimal judul EN terisi). */
export function hasEnglish(a: ArticleLangFields): boolean {
  return Boolean(a.titleEn && a.titleEn.trim())
}

export function pickArticle<T extends ArticleLangFields>(a: T, locale: Locale) {
  const en = locale === "en"
  return {
    title: en && a.titleEn ? a.titleEn : a.title,
    excerpt: en && a.excerptEn ? a.excerptEn : a.excerpt ?? null,
    content: en && a.contentEn ? a.contentEn : a.content ?? "",
    metaTitle: en && a.metaTitleEn ? a.metaTitleEn : a.metaTitle ?? null,
    metaDescription: en && a.metaDescriptionEn ? a.metaDescriptionEn : a.metaDescription ?? null,
  }
}
