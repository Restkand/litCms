import type { Metadata } from "next"
import Link from "next/link"
import { getI18n } from "@/lib/i18n"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n()
  return {
    title: locale === "en" ? "About Us" : "Tentang Kami",
    description: dict.tentang.s1Body,
    alternates: { canonical: "/tentang" },
  }
}

export default async function TentangPage() {
  const { dict } = await getI18n()
  const t = dict.tentang

  return (
    <>
      {/* 1. PEMBUKA */}
      <header className="mx-auto max-w-[1200px] px-6 pb-16 pt-[60px] md:px-10">
        <div className="mb-[22px] font-mono" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6C685D" }}>
          <Link href="/" className="hover:!text-[#BF6440]" style={{ color: "#6C685D", textDecoration: "none" }}>{dict.nav.home}</Link>{" "}
          <span style={{ color: "#BFB7A4" }}>/</span> <span style={{ color: "#BF6440" }}>{t.breadcrumb}</span>
        </div>
        <div className="grid grid-cols-1 items-end gap-14 md:grid-cols-[1.5fr_1fr]">
          <h1 className="font-serif" style={{ fontWeight: 500, fontSize: "clamp(44px,7vw,72px)", lineHeight: 0.98, letterSpacing: "-0.02em", color: "#16302A" }}>
            {t.s1TitleLead}
            <em style={{ fontStyle: "italic", color: "#BF6440" }}>{t.s1TitleEm}</em>
            {t.s1TitleTail}
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "#3A382F", borderLeft: "1.5px solid #C9C1AE", paddingLeft: 24 }}>{t.s1Body}</p>
        </div>
      </header>

      {/* 2. CERITA KAMI */}
      <section style={{ background: "#EAE3D3", borderTop: "1px solid #D6CBB0", borderBottom: "1px solid #D6CBB0" }}>
        <div className="mx-auto max-w-[1200px] px-6 py-[84px] md:px-10">
          <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <div className="mb-4 flex items-center gap-3 font-mono" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#20413A" }}>
                <span>02</span>
                <span style={{ width: 40, height: 1, background: "#20413A" }} />
              </div>
              <h2 className="font-serif" style={{ fontWeight: 500, fontSize: 40, lineHeight: 1.05, color: "#16302A", letterSpacing: "-0.01em" }}>{t.s2Title}</h2>
            </div>
            <div className="flex flex-col gap-[22px]">
              <p className="font-serif" style={{ fontSize: 24, lineHeight: 1.45, color: "#20413A" }}>{t.s2Lead}</p>
              <p style={{ fontSize: 16.5, lineHeight: 1.75, color: "#3A382F" }}>{t.s2P1}</p>
              <p style={{ fontSize: 16.5, lineHeight: 1.75, color: "#3A382F" }}>{t.s2P2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. APA YANG KAMI KERJAKAN */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:px-10">
        <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="mb-[18px] flex items-center gap-3 font-mono" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#20413A" }}>
              <span>03</span>
              <span style={{ width: 40, height: 1, background: "#20413A" }} />
              <span>{t.s3Label}</span>
            </div>
            <h2 className="font-serif" style={{ fontWeight: 500, fontSize: 42, lineHeight: 1.06, color: "#16302A", letterSpacing: "-0.01em" }}>{t.s3Title}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "#3A382F", marginTop: 20, maxWidth: "40ch" }}>{t.s3Body}</p>
          </div>
          <div>
            {t.s3Items.map((it, i) => (
              <div key={it.tag} className="flex items-baseline justify-between gap-4" style={{ padding: "22px 0", borderTop: i === 0 ? "1.5px solid #20413A" : "1px solid #DDD3BE", borderBottom: i === t.s3Items.length - 1 ? "1px solid #DDD3BE" : "none" }}>
                <div className="font-mono" style={{ fontSize: 11, color: "#BF6440", width: 64, flexShrink: 0 }}>{it.tag}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#16302A" }}>{it.title}</div>
                  <div style={{ fontSize: 14.5, color: "#6C685D", marginTop: 4 }}>{it.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CARA KAMI BEKERJA */}
      <section style={{ background: "#16302A", color: "#E3D9C3" }}>
        <div className="mx-auto max-w-[1200px] px-6 py-[88px] md:px-10">
          <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-2">
            <div>
              <div className="mb-[18px] flex items-center gap-3 font-mono" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#BF6440" }}>
                <span>04</span>
                <span style={{ width: 40, height: 1, background: "#BF6440" }} />
                <span>{t.s4Label}</span>
              </div>
              <h2 className="font-serif" style={{ fontWeight: 500, fontSize: 42, lineHeight: 1.05, color: "#F1ECE0", letterSpacing: "-0.01em" }}>{t.s4Title}</h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.75, color: "#B9C5BD", marginTop: 22, maxWidth: "46ch" }}>{t.s4Body}</p>
            </div>
            <div>
              {t.s4Steps.map((s, i) => (
                <div key={s.num} className="flex gap-5" style={{ padding: "22px 0", borderTop: i === 0 ? "1.5px solid #3C5A50" : "1px solid #2E4A41", borderBottom: i === t.s4Steps.length - 1 ? "1px solid #2E4A41" : "none" }}>
                  <div className="font-mono" style={{ fontSize: 13, color: "#BF6440" }}>{s.num}</div>
                  <div>
                    <div style={{ fontSize: 19, fontWeight: 600, color: "#F1ECE0" }}>{s.title}</div>
                    <div style={{ fontSize: 14.5, color: "#9FB3A8", marginTop: 5 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. BUKTI NYATA */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:px-10">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-[18px] flex items-center gap-3 font-mono" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#20413A" }}>
              <span>05</span>
              <span style={{ width: 40, height: 1, background: "#20413A" }} />
              <span>{t.s5Label}</span>
            </div>
            <h2 className="font-serif" style={{ fontWeight: 500, fontSize: 42, lineHeight: 1.05, color: "#16302A", letterSpacing: "-0.01em" }}>{t.s5Title}</h2>
          </div>
          <Link href="/produk" className="font-mono hover:!text-[#BF6440]" style={{ fontSize: 13, color: "#20413A", textDecoration: "none", fontWeight: 500, borderBottom: "1.5px solid #BF6440", paddingBottom: 3 }}>
            {t.s5All}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderTop: "1.5px solid #20413A" }}>
          <div className="md:border-r md:pr-9" style={{ padding: "32px 0", borderColor: "#D6CBB0" }}>
            <div className="mb-[14px] font-mono" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#BF6440" }}>{t.s5SafarTag}</div>
            <h3 className="font-serif" style={{ fontSize: 30, color: "#16302A", marginBottom: 12, lineHeight: 1.1 }}>{t.s5SafarTitle}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#3A382F" }}>{t.s5SafarBody}</p>
          </div>
          <div className="md:pl-9" style={{ padding: "32px 0" }}>
            <div className="mb-[14px] font-mono" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3E7A5C" }}>{t.s5SistemTag}</div>
            <h3 className="font-serif" style={{ fontSize: 30, color: "#16302A", marginBottom: 12, lineHeight: 1.1 }}>{t.s5SistemTitle}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#3A382F" }}>{t.s5SistemBody}</p>
          </div>
        </div>
        <div className="mt-7 pt-6" style={{ borderTop: "1px solid #D6CBB0" }}>
          <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#3A382F", maxWidth: "80ch" }}>{t.s5More}</p>
        </div>
      </section>

      {/* 6. NILAI KAMI */}
      <section style={{ background: "#EAE3D3", borderTop: "1px solid #D6CBB0", borderBottom: "1px solid #D6CBB0" }}>
        <div className="mx-auto max-w-[1200px] px-6 py-[84px] md:px-10">
          <div className="mb-7 flex items-center gap-3 font-mono" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#20413A" }}>
            <span>06</span>
            <span style={{ width: 40, height: 1, background: "#20413A" }} />
            <span>{t.s6Label}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderTop: "1.5px solid #20413A" }}>
            {t.s6Values.map((v, i) => (
              <div key={v.num} style={{ padding: "28px 22px", borderLeft: i === 0 ? "none" : "1px solid #C9BFA8" }}>
                <div className="font-mono" style={{ fontSize: 11, color: "#BF6440" }}>{v.num}</div>
                <div className="font-serif" style={{ fontSize: 26, color: "#16302A", margin: "10px 0" }}>{v.name}</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "#5A574C" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ANGKA RINGKAS */}
      <section className="mx-auto max-w-[1200px] px-6 py-[72px] md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {t.s7Stats.map((s, i) => (
            <div key={s.label} style={{ padding: "8px 32px", borderLeft: i === 0 ? "none" : undefined, borderRight: i < t.s7Stats.length - 1 ? "1px solid #D6CBB0" : "none", paddingLeft: i === 0 ? 0 : 32 }}>
              <div className="font-serif" style={{ fontSize: 60, lineHeight: 1, color: "#16302A", letterSpacing: "-0.02em" }}>
                {s.value}
                <span style={{ color: "#BF6440" }}>{s.suffix}</span>
              </div>
              <div className="mt-[14px] font-mono" style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6C685D" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. AJAKAN KERJA SAMA */}
      <section style={{ background: "#20413A", color: "#E3D9C3" }}>
        <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-24 text-center md:px-10">
          <div className="mb-[22px] font-mono" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#BF6440" }}>{t.s8Eyebrow}</div>
          <h2 className="font-serif" style={{ fontWeight: 500, fontSize: 46, lineHeight: 1.08, color: "#F1ECE0", letterSpacing: "-0.01em", maxWidth: "18ch" }}>{t.s8Title}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "#9FB3A8", marginTop: 22, maxWidth: "52ch" }}>{t.s8Body}</p>
          <Link href="/#kontak" className="hover:!bg-[#cf724d]" style={{ display: "inline-block", marginTop: 34, background: "#BF6440", color: "#1A1208", fontWeight: 600, fontSize: 16, padding: "16px 32px", borderRadius: 8, textDecoration: "none" }}>
            {t.s8Cta}
          </Link>
        </div>
      </section>
    </>
  )
}
