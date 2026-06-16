"use client"

import { useMemo, useState } from "react"
import type { Platform } from "@/lib/products"
import ProductShot from "@/app/components/site/ProductShot"

export interface ResolvedProduct {
  id: string
  num: string
  name: string
  platforms: Platform[]
  eyebrow: string
  desc: string
  features: string[]
  tags: string[]
  status: { text: string; kind: "dev" | "field" } | null
  mainLayout: "landscape" | "portrait"
  mainPlaceholder: string
  companion: boolean
  companionPlaceholder: string
  caption: string
}

interface FilterDef {
  key: "all" | Platform
  label: string
}

const pillBase: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  padding: "9px 16px",
  borderRadius: 99,
  cursor: "pointer",
}

const chipFeature: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 9,
  background: "#FAF6EC",
  border: "1px solid #E2D9C5",
  borderRadius: 8,
  padding: "11px 13px",
}

const tagStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.04em",
  color: "#20413A",
  border: "1px solid #C9C1AE",
  borderRadius: 99,
  padding: "5px 12px",
}

export default function ProdukTimeline({
  products,
  filters,
  countWord,
  noResults,
}: {
  products: ResolvedProduct[]
  filters: FilterDef[]
  countWord: string
  noResults: string
}) {
  const [active, setActive] = useState<"all" | Platform>("all")

  const shown = useMemo(
    () => (active === "all" ? products : products.filter((p) => p.platforms.includes(active))),
    [active, products],
  )

  return (
    <>
      {/* filter bar */}
      <div className="mx-auto max-w-[1200px] px-6 pb-2 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4" style={{ borderTop: "1.5px solid #20413A", borderBottom: "1px solid #D6CBB0" }}>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const on = active === f.key
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActive(f.key)}
                  style={{ ...pillBase, background: on ? "#20413A" : "transparent", color: on ? "#F1ECE0" : "#20413A", border: `1.5px solid ${on ? "#20413A" : "#C9C1AE"}` }}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
          <div className="font-mono" style={{ fontSize: 12, color: "#6C685D", letterSpacing: "0.06em" }}>
            {shown.length} {countWord}
          </div>
        </div>
      </div>

      {/* timeline */}
      <section className="mx-auto max-w-[1200px] px-6 pb-10 pt-2 md:px-10">
        {shown.map((p) => (
          <div
            key={p.id}
            className="relative grid grid-cols-[26px_1fr] items-start gap-[18px] md:grid-cols-[44px_0.94fr_1.06fr] md:items-center md:gap-11"
            style={{ padding: "52px 0" }}
          >
            {/* spine */}
            <div className="relative flex justify-center" style={{ gridRow: "1 / -1" }}>
              <div style={{ width: 2, background: "#D6CBB0", height: "100%" }} />
              <div style={{ position: "absolute", top: 8, width: 15, height: 15, borderRadius: 99, background: "#BF6440", border: "3px solid #F1ECE0", boxShadow: "0 0 0 1.5px #D6CBB0" }} />
            </div>

            {/* text */}
            <div className="col-start-2">
              <div className="mb-[14px] font-mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#BF6440" }}>
                {p.num} · {p.eyebrow}
              </div>
              <h2 className="font-serif" style={{ fontWeight: 500, fontSize: 38, lineHeight: 1.02, letterSpacing: "-0.01em", color: "#16302A", marginBottom: 14 }}>
                {p.name}
              </h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "#3A382F", maxWidth: "48ch" }}>{p.desc}</p>
              <div className="mt-[22px] grid grid-cols-1 gap-[10px] md:grid-cols-2">
                {p.features.map((f) => (
                  <div key={f} style={chipFeature}>
                    <span style={{ width: 7, height: 7, borderRadius: 99, background: "#BF6440", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, lineHeight: 1.3, color: "#3A382F" }}>{f}</span>
                  </div>
                ))}
              </div>
              <div className="mt-[18px] flex flex-wrap gap-2">
                {p.status && (
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.04em",
                      borderRadius: 99,
                      padding: "5px 12px",
                      color: p.status.kind === "field" ? "#3E7A5C" : "#BF6440",
                      border: `1px solid ${p.status.kind === "field" ? "#A9CBB7" : "#E4BCA9"}`,
                    }}
                  >
                    {p.status.text}
                  </span>
                )}
                {p.tags.map((t) => (
                  <span key={t} style={tagStyle}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* media */}
            <div className="col-start-2 row-start-2 mt-6 md:col-start-3 md:row-start-1 md:mt-0">
              <div className="flex flex-col items-center gap-[18px]" style={{ background: "#EAE3D3", border: "1px solid #E0D6C0", borderRadius: 16, padding: 28 }}>
                <ProductShot
                  id={p.id}
                  alt={p.name}
                  layout={p.mainLayout}
                  placeholder={p.mainPlaceholder}
                  radius={p.mainLayout === "portrait" ? 26 : 12}
                  maxWidth={p.mainLayout === "portrait" ? 192 : 440}
                />
                {p.companion ? (
                  <div className="flex w-full max-w-[430px] items-center gap-4">
                    <ProductShot id={`${p.id}-app`} alt={`${p.name} app`} layout="portrait" placeholder={p.companionPlaceholder} radius={22} maxWidth={120} />
                    <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A8473", lineHeight: 1.6 }}>
                      {p.caption}
                    </div>
                  </div>
                ) : (
                  <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8A8473" }}>
                    {p.caption}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {shown.length === 0 && (
          <div className="py-16 text-center font-mono" style={{ fontSize: 13, color: "#6C685D" }}>
            {noResults}
          </div>
        )}
      </section>
    </>
  )
}
