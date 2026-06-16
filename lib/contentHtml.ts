import sanitizeHtml from "sanitize-html"

const SANITIZE_OPTS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "hr",
    "h2", "h3", "h4",
    "strong", "b", "em", "i", "u", "s",
    "a", "ul", "ol", "li", "blockquote",
    "code", "pre", "img",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    // pastikan link eksternal aman
    a: (tagName, attribs) => ({
      tagName: "a",
      attribs: {
        ...attribs,
        ...(attribs.href && /^https?:\/\//i.test(attribs.href)
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {}),
      },
    }),
  },
}

/** Deteksi kasar apakah string sudah berupa HTML (mengandung tag). */
export function isHtml(s: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(s)
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

/** Ubah teks polos (artikel lama) menjadi paragraf HTML. */
export function plainToHtml(raw: string): string {
  const blocks = raw.replace(/\r\n/g, "\n").split(/\n{2,}/)
  return blocks
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b) => `<p>${escapeHtml(b).replace(/\n/g, "<br>")}</p>`)
    .join("")
}

/** HTML siap-render untuk konten artikel (sanitized). Backward-compatible dgn teks polos. */
export function toArticleHtml(raw: string | null | undefined): string {
  if (!raw || !raw.trim()) return ""
  const html = isHtml(raw) ? raw : plainToHtml(raw)
  return sanitizeHtml(html, SANITIZE_OPTS)
}

/** Buang seluruh tag → teks polos (untuk hitung lama-baca / validasi kosong). */
export function htmlToPlain(raw: string | null | undefined): string {
  if (!raw) return ""
  const html = isHtml(raw) ? raw : plainToHtml(raw)
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim()
}
