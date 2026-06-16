"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import type { Locale } from "@/lib/i18n/config"
import { LOCALE_COOKIE } from "@/lib/i18n/config"

export default function LangSwitch({ locale, size = "sm" }: { locale: Locale; size?: "sm" | "md" }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const set = (next: Locale) => {
    if (next === locale) return
    // 1 tahun, berlaku di seluruh situs
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`
    startTransition(() => router.refresh())
  }

  const pad = size === "md" ? "9px 18px" : "8px 14px"
  const fontSize = size === "md" ? 13 : 12

  const btn = (l: Locale, label: string) => {
    const active = l === locale
    return (
      <button
        type="button"
        onClick={() => set(l)}
        aria-pressed={active}
        disabled={pending}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize,
          letterSpacing: "0.06em",
          background: active ? "#20413A" : "transparent",
          color: active ? "#F1ECE0" : "#20413A",
          border: "none",
          padding: pad,
          cursor: active ? "default" : "pointer",
        }}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="inline-flex overflow-hidden rounded-full" style={{ border: "1.5px solid #C9C1AE" }}>
      {btn("id", "ID")}
      {btn("en", "EN")}
    </div>
  )
}
