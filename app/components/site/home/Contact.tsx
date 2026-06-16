"use client"

import { useState } from "react"
import type { Dictionary } from "@/lib/i18n"

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#5A574C",
}
const inputStyle: React.CSSProperties = {
  background: "#FAF6EC",
  border: "1.5px solid #DDD3BE",
  borderRadius: 6,
  padding: "12px 13px",
  fontSize: 15,
  color: "#20201B",
  outline: "none",
}
const errStyle: React.CSSProperties = { fontFamily: "var(--font-mono)", fontSize: 10.5, color: "#BF6440" }

export default function Contact({ dict }: { dict: Dictionary }) {
  const c = dict.contact
  const [form, setForm] = useState({
    nama: "",
    perusahaan: "",
    email: "",
    telepon: "",
    jenis: c.jenisOptions[0],
    pesan: "",
  })
  const [errors, setErrors] = useState<{ nama?: string; email?: string; pesan?: string }>({})
  const [sending, setSending] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState("")

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const v = e.target.value
    setForm((s) => ({ ...s, [k]: v }))
    if (k === "nama" || k === "email" || k === "pesan") setErrors((s) => ({ ...s, [k]: undefined }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)
    const next: typeof errors = {}
    if (!form.nama.trim()) next.nama = c.errNama
    if (!form.email.trim()) next.email = c.errEmail
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = c.errEmailInvalid
    if (!form.pesan.trim()) next.pesan = c.errPesan
    if (Object.keys(next).length) {
      setErrors(next)
      return
    }

    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.nama.trim(),
          email: form.email.trim(),
          whatsapp: form.telepon.trim(),
          company: form.perusahaan.trim(),
          topic: "kerjasama",
          message: `[${c.labelJenis}: ${form.jenis}]\n\n${form.pesan.trim()}`,
        }),
      })
      if (!res.ok) throw new Error("request failed")
      setSubmittedName(form.nama.trim().split(" ")[0])
      setSubmitted(true)
    } catch {
      setServerError(c.errServer)
    } finally {
      setSending(false)
    }
  }

  const reset = () => {
    setForm({ nama: "", perusahaan: "", email: "", telepon: "", jenis: c.jenisOptions[0], pesan: "" })
    setErrors({})
    setServerError(null)
    setSubmitted(false)
    setSubmittedName("")
  }

  return (
    <div style={{ background: "#F1ECE0", borderRadius: 12, padding: 36 }}>
      {submitted ? (
        <div className="flex min-h-[380px] flex-col items-start justify-center">
          <div className="font-mono" style={{ fontSize: 12, color: "#BF6440", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
            {c.sentTag}
          </div>
          <h3 className="font-serif" style={{ fontSize: 30, color: "#16302A", lineHeight: 1.15, marginBottom: 12 }}>
            {c.sentTitle}, {submittedName}.
          </h3>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "#3A382F" }}>{c.sentBody}</p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: 24, background: "transparent", border: "1.5px solid #20413A", color: "#20413A", fontWeight: 600, fontSize: 14, padding: "11px 20px", borderRadius: 6, cursor: "pointer" }}
          >
            {c.sentAgain}
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="flex flex-col gap-[18px]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-[7px]">
              <span style={labelStyle}>{c.labelNama}</span>
              <input value={form.nama} onChange={set("nama")} type="text" placeholder={c.phNama} style={inputStyle} />
              {errors.nama && <span style={errStyle}>{errors.nama}</span>}
            </label>
            <label className="flex flex-col gap-[7px]">
              <span style={labelStyle}>{c.labelPerusahaan}</span>
              <input value={form.perusahaan} onChange={set("perusahaan")} type="text" placeholder={c.phPerusahaan} style={inputStyle} />
            </label>
          </div>
          <label className="flex flex-col gap-[7px]">
            <span style={labelStyle}>{c.labelEmail}</span>
            <input value={form.email} onChange={set("email")} type="email" placeholder={c.phEmail} style={inputStyle} />
            {errors.email && <span style={errStyle}>{errors.email}</span>}
          </label>
          <label className="flex flex-col gap-[7px]">
            <span style={labelStyle}>
              {c.labelTelepon} <span style={{ textTransform: "none", letterSpacing: 0, color: "#9A9686" }}>{c.teleponOpt}</span>
            </span>
            <input value={form.telepon} onChange={set("telepon")} type="tel" placeholder={c.phTelepon} style={inputStyle} />
          </label>
          <label className="flex flex-col gap-[7px]">
            <span style={labelStyle}>{c.labelJenis}</span>
            <select value={form.jenis} onChange={set("jenis")} style={inputStyle}>
              {c.jenisOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-[7px]">
            <span style={labelStyle}>{c.labelPesan}</span>
            <textarea value={form.pesan} onChange={set("pesan")} rows={4} placeholder={c.phPesan} style={{ ...inputStyle, resize: "vertical" }} />
            {errors.pesan && <span style={errStyle}>{errors.pesan}</span>}
          </label>
          {serverError && <span style={{ ...errStyle, fontSize: 12 }}>{serverError}</span>}
          <button
            type="submit"
            disabled={sending}
            style={{ background: "#20413A", color: "#F1ECE0", fontWeight: 600, fontSize: 15, padding: 15, borderRadius: 7, border: "none", cursor: sending ? "default" : "pointer", marginTop: 4, opacity: sending ? 0.7 : 1 }}
          >
            {sending ? c.sending : c.submit}
          </button>
        </form>
      )}
    </div>
  )
}
