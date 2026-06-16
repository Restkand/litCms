"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import type { Locale } from "@/lib/i18n/config"
import LangSwitch from "./LangSwitch"

type NavDict = { produk: string; tentang: string; artikel: string }

const LINKS = [
  { href: "/produk", key: "produk" as const },
  { href: "/tentang", key: "tentang" as const },
  { href: "/article", key: "artikel" as const },
]

export default function Navbar({ dict, locale }: { dict: NavDict; locale: Locale }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: "rgba(241,236,224,0.88)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #D6CBB0",
      }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="font-serif"
          style={{ fontSize: 26, fontWeight: 700, letterSpacing: "0.02em", color: "#16302A", textDecoration: "none" }}
        >
          NUII
        </Link>

        {/* desktop links */}
        <div className="hidden items-center gap-8 whitespace-nowrap md:flex">
          {LINKS.map((l) => {
            const active = isActive(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-[#BF6440]"
                style={{
                  fontSize: 14.5,
                  fontWeight: active ? 600 : 500,
                  color: active ? "#16302A" : "#3A382F",
                  textDecoration: "none",
                  borderBottom: active ? "2px solid #BF6440" : "2px solid transparent",
                  paddingBottom: 2,
                }}
              >
                {dict[l.key]}
              </Link>
            )
          })}
          <LangSwitch locale={locale} />
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
          className="flex h-[42px] w-[42px] items-center justify-center md:hidden"
          style={{ background: "transparent", border: "1px solid #20413A", borderRadius: 6, color: "#20413A", fontSize: 18 }}
        >
          ≡
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 px-6 pb-5 pt-3 md:hidden" style={{ borderTop: "1px solid #D6CBB0" }}>
          {LINKS.map((l) => {
            const active = isActive(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  padding: "12px 4px",
                  fontSize: 16,
                  fontWeight: active ? 600 : 500,
                  color: active ? "#16302A" : "#20413A",
                  textDecoration: "none",
                  borderBottom: "1px solid #E2D9C5",
                }}
              >
                {dict[l.key]}
              </Link>
            )
          })}
          <div className="mt-3 self-start">
            <LangSwitch locale={locale} size="md" />
          </div>
        </div>
      )}
    </nav>
  )
}
