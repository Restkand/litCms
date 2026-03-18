'use client'

import { useState, useRef } from 'react'

const topics = [
  { value: 'konsultasi',    label: 'Konsultasi IT' },
  { value: 'pengembangan',  label: 'Pengembangan Aplikasi' },
  { value: 'kerjasama',     label: 'Kerja Sama Bisnis' },
  { value: 'pertanyaan',    label: 'Pertanyaan Umum' },
  { value: 'lainnya',       label: 'Lainnya' },
]

const messagePlaceholders: Record<string, string> = {
  konsultasi: `Halo Tim Nuii,

Saya ingin berkonsultasi mengenai kebutuhan IT perusahaan kami. Saat ini kami sedang mencari solusi untuk [jelaskan kebutuhan Anda, misalnya: sistem manajemen internal, migrasi ke cloud, dsb].

Berikut sedikit gambaran situasi kami:
- Jumlah pengguna: ...
- Platform yang digunakan: ...
- Timeline yang diharapkan: ...

Mohon informasikan lebih lanjut mengenai layanan yang tersedia.

Terima kasih,
[Nama Anda]`,

  pengembangan: `Halo Tim Nuii,

Saya tertarik untuk mendiskusikan pengembangan aplikasi [web/mobile/desktop] untuk [nama bisnis/komunitas Anda].

Gambaran singkat proyek:
- Fungsi utama: ...
- Target pengguna: ...
- Platform: [Android / iOS / Web / Desktop]
- Estimasi selesai: ...

Saya berharap kita bisa menjadwalkan meeting awal untuk membahas lebih detail.

Salam,
[Nama Anda]`,

  kerjasama: `Halo Tim Nuii,

Kami dari [nama perusahaan/organisasi] tertarik untuk menjalin kerja sama dengan Nuii dalam bidang [sebutkan bidang kerjasama].

Tentang kami:
- Nama perusahaan: ...
- Bidang usaha: ...
- Skala bisnis: ...

Kami ingin berdiskusi lebih lanjut mengenai kemungkinan kolaborasi yang saling menguntungkan.

Hormat kami,
[Nama Anda]`,

  pertanyaan: `Halo Tim Nuii,

Saya memiliki pertanyaan mengenai layanan yang Nuii tawarkan.

Pertanyaan saya:
1. ...
2. ...

Mohon penjelasannya, terima kasih.

Salam,
[Nama Anda]`,

  lainnya: `Halo Tim Nuii,

[Tuliskan pesan Anda di sini ...]

Terima kasih,
[Nama Anda]`,
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', company: '', topic: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleTopicChange(value: string) {
    setForm((f) => ({ ...f, topic: value, message: messagePlaceholders[value] ?? '' }))
    // Auto-resize textarea after state update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
      }
    }, 0)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (name === 'message' && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Terjadi kesalahan.')
        setStatus('error')
      } else {
        setStatus('success')
        setForm({ name: '', email: '', company: '', topic: '', message: '' })
      }
    } catch {
      setErrorMsg('Gagal terhubung ke server. Periksa koneksi internet Anda.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-gray-950 py-16 sm:py-24 px-4 border-t border-gray-800/60">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-amber-400 mb-3 block">
            Hubungi Kami
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Contact Us
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Punya pertanyaan, ide proyek, atau ingin berkolaborasi? Ceritakan kepada kami — tim Nuii siap merespons.
          </p>
          <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-amber-400 opacity-60" />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Left — info cards */}
          <div className="w-full lg:w-2/5 space-y-5">
            <InfoCard
              color="#f59e0b"
              title="Email"
              value="nuiiapps3@gmail.com"
              sub="Balasan dalam 1×24 jam kerja"
              icon={
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
            />
            <InfoCard
              color="#3b82f6"
              title="Lokasi"
              value="Jakarta, Indonesia"
              sub="Melayani klien di seluruh Indonesia"
              icon={
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
            />
            <InfoCard
              color="#10b981"
              title="Layanan"
              value="Mobile · Web · Desktop · Konsultasi"
              sub="Solusi end-to-end untuk bisnis Anda"
              icon={
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              }
            />
            <p className="text-gray-600 text-xs leading-relaxed pt-1">
              Pesan Anda akan diterima langsung oleh tim Nuii. Kami menjaga kerahasiaan informasi yang Anda bagikan.
            </p>
          </div>

          {/* Right — form */}
          <div className="w-full lg:w-3/5">
            {status === 'success' ? (
              <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Pesan Terkirim!</h3>
                <p className="text-gray-400 text-sm mb-6">Terima kasih telah menghubungi kami. Tim Nuii akan membalas ke email Anda dalam 1×24 jam kerja.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-sm transition-colors"
                >
                  Kirim Pesan Lagi
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-7 sm:p-8 space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Nama Lengkap *">
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Contoh: Ahmad Fauzi"
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </Field>
                  <Field label="Alamat Email *">
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="nama@email.com"
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Perusahaan / Organisasi">
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Opsional"
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </Field>
                  <Field label="Topik *">
                    <select
                      name="topic"
                      value={form.topic}
                      onChange={(e) => handleTopicChange(e.target.value)}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors appearance-none"
                    >
                      <option value="" disabled>Pilih topik...</option>
                      {topics.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                {form.topic && (
                  <div className="flex items-center gap-2 text-xs text-amber-400/70 bg-amber-400/5 border border-amber-400/20 rounded-lg px-3 py-2">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Subjek otomatis: <span className="font-semibold text-amber-400">[Nuii] {topics.find(t => t.value === form.topic)?.label} — {form.name || 'Nama Anda'}</span>
                  </div>
                )}

                <Field label="Pesan *">
                  <textarea
                    ref={textareaRef}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={10}
                    placeholder={form.topic ? undefined : 'Pilih topik terlebih dahulu untuk mendapatkan template pesan...'}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-400 transition-colors resize-none leading-relaxed font-mono"
                  />
                  <p className="text-right text-xs text-gray-700 mt-1">{form.message.length} / 3000</p>
                </Field>

                {status === 'error' && (
                  <p className="text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-gray-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      Kirim Pesan
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}

function InfoCard({
  color, title, value, sub, icon,
}: {
  color: string; title: string; value: string; sub: string; icon: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-xl p-5">
      <div className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center" style={{ background: color + '18', color }}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">{title}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
        <p className="text-xs text-gray-600 mt-0.5">{sub}</p>
      </div>
    </div>
  )
}
