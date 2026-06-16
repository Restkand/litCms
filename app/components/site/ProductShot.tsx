"use client"

import { useState } from "react"

/**
 * Slot foto produk. Coba muat /public/products/<id>.(webp|jpg|png); jika belum
 * ada (atau gagal), tampilkan placeholder bergaris dengan caption — pemilik
 * tinggal menaruh file foto di public/products/ untuk menggantinya.
 */
export default function ProductShot({
  id,
  alt,
  layout,
  placeholder,
  radius = 12,
  maxWidth,
  className,
}: {
  id: string
  alt: string
  layout: "landscape" | "portrait"
  placeholder: string
  radius?: number
  maxWidth?: number
  className?: string
}) {
  const candidates = [`/products/${id}.webp`, `/products/${id}.jpg`, `/products/${id}.png`]
  const [idx, setIdx] = useState(0)
  const failed = idx >= candidates.length

  const aspect = layout === "portrait" ? "9 / 19" : "16 / 10"
  const wrapStyle: React.CSSProperties = {
    width: "100%",
    maxWidth,
    aspectRatio: aspect,
    borderRadius: radius,
    overflow: "hidden",
  }

  if (failed) {
    return (
      <div
        className={className}
        style={{
          ...wrapStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 16,
          background:
            "repeating-linear-gradient(135deg,#E6DDCB,#E6DDCB 11px,#DED3BD 11px,#DED3BD 22px)",
          border: "1.5px dashed #C9BFA8",
        }}
      >
        <span
          className="font-mono"
          style={{ fontSize: 11, letterSpacing: "0.08em", color: "#8A7F69", maxWidth: "85%" }}
        >
          {placeholder}
        </span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={candidates[idx]}
      alt={alt}
      loading="lazy"
      onError={() => setIdx((i) => i + 1)}
      style={{ ...wrapStyle, objectFit: "cover", display: "block", background: "#E6DDCB" }}
    />
  )
}
