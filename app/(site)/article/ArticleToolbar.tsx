"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

interface Category {
  name: string
  slug: string
}

const pill = (active: boolean): React.CSSProperties => ({
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  background: active ? "#20413A" : "transparent",
  color: active ? "#F1ECE0" : "#20413A",
  border: `1.5px solid ${active ? "#20413A" : "#C9C1AE"}`,
  padding: "9px 15px",
  borderRadius: 99,
  cursor: "pointer",
})

export default function ArticleToolbar({
  categories,
  currentCategory,
  currentQuery,
  allLabel,
  searchPlaceholder,
}: {
  categories: Category[]
  currentCategory: string | null
  currentQuery: string
  allLabel: string
  searchPlaceholder: string
}) {
  const router = useRouter()
  const [q, setQ] = useState(currentQuery)
  const first = useRef(true)

  const buildUrl = (category: string | null, query: string) => {
    const params = new URLSearchParams()
    if (category) params.set("category", category)
    if (query.trim()) params.set("q", query.trim())
    const qs = params.toString()
    return `/article${qs ? `?${qs}` : ""}`
  }

  // debounce pencarian → update URL
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const id = setTimeout(() => {
      if (q.trim() !== currentQuery) router.push(buildUrl(currentCategory, q))
    }, 350)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  const chip = (slug: string | null, label: string) => {
    const active = currentCategory === slug || (slug === null && !currentCategory)
    return (
      <button key={slug ?? "all"} type="button" onClick={() => router.push(buildUrl(slug, q))} style={pill(active)}>
        {label}
      </button>
    )
  }

  return (
    <div className="flex flex-col items-stretch justify-between gap-5 pt-[22px] md:flex-row md:items-center" style={{ borderTop: "1.5px solid #20413A" }}>
      <div className="flex flex-wrap gap-2">
        {chip(null, allLabel)}
        {categories.map((c) => chip(c.slug, c.name))}
      </div>
      <div className="relative w-full flex-shrink-0 md:w-auto md:min-w-[240px]">
        <span className="font-mono" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#9A9686" }}>
          ⌕
        </span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="text"
          placeholder={searchPlaceholder}
          style={{ width: "100%", background: "#FAF6EC", border: "1.5px solid #DDD3BE", borderRadius: 99, padding: "11px 16px 11px 34px", fontSize: 14, color: "#20201B", outline: "none" }}
        />
      </div>
    </div>
  )
}
