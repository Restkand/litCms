import Link from "next/link"
import type { Dictionary } from "@/lib/i18n"

const linkStyle = { color: "#B9C5BD", textDecoration: "none" } as const

export default function Footer({ dict }: { dict: Dictionary }) {
  const f = dict.footer
  return (
    <footer style={{ background: "#16302A", color: "#B9C5BD", borderTop: "1px solid #2E4A41" }}>
      <div className="mx-auto max-w-[1200px] px-6 pb-8 pt-16 md:px-10">
        <div
          className="grid grid-cols-2 gap-10 pb-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]"
          style={{ borderBottom: "1px solid #2E4A41" }}
        >
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif" style={{ fontSize: 30, fontWeight: 700, color: "#F1ECE0", letterSpacing: "0.02em" }}>
              NUII
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#8FA399", marginTop: 14, maxWidth: "34ch" }}>
              {f.tagline}
            </p>
            <div
              className="font-mono"
              style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7E978B", marginTop: 22 }}
            >
              {f.values}
            </div>
          </div>

          <div>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7E978B", marginBottom: 16 }}>
              {f.colProduk}
            </div>
            <div className="flex flex-col gap-3" style={{ fontSize: 14.5 }}>
              <Link href="/produk" style={linkStyle} className="hover:!text-[#BF6440]">SAFAR</Link>
              <Link href="/produk" style={linkStyle} className="hover:!text-[#BF6440]">{f.linkMonitoring}</Link>
              <Link href="/produk" style={linkStyle} className="hover:!text-[#BF6440]">Wisezone</Link>
              <Link href="/produk" style={linkStyle} className="hover:!text-[#BF6440]">{f.linkAllProducts}</Link>
            </div>
          </div>

          <div>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7E978B", marginBottom: 16 }}>
              {f.colCompany}
            </div>
            <div className="flex flex-col gap-3" style={{ fontSize: 14.5 }}>
              <Link href="/tentang" style={linkStyle} className="hover:!text-[#BF6440]">{dict.nav.tentang}</Link>
              <Link href="/#kerjasama" style={linkStyle} className="hover:!text-[#BF6440]">{f.linkKerjaSama}</Link>
              <Link href="/article" style={linkStyle} className="hover:!text-[#BF6440]">{dict.nav.artikel}</Link>
              <Link href="/#kontak" style={linkStyle} className="hover:!text-[#BF6440]">{f.linkKontak}</Link>
            </div>
          </div>

          <div>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7E978B", marginBottom: 16 }}>
              {f.colContact}
            </div>
            <div className="flex flex-col gap-3 font-mono" style={{ fontSize: 13, color: "#B9C5BD" }}>
              <a href="mailto:nuiiapps3@gmail.com" style={linkStyle} className="hover:!text-[#BF6440]">nuiiapps3@gmail.com</a>
              <span>{dict.contact.location}</span>
            </div>
          </div>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-3 pt-6 font-mono"
          style={{ fontSize: 11, letterSpacing: "0.06em", color: "#7E978B" }}
        >
          <span>{f.copyright}</span>
          <span>{f.builtIn}</span>
        </div>
      </div>
    </footer>
  )
}
