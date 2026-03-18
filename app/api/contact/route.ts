import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const RECIPIENT = 'nuiiapps3@gmail.com'
const CC = 'reiskand07@gmail.com'

const topicSubjectMap: Record<string, string> = {
  konsultasi: 'Konsultasi IT',
  pengembangan: 'Pengembangan Aplikasi',
  kerjasama: 'Kerja Sama Bisnis',
  pertanyaan: 'Pertanyaan Umum',
  lainnya: 'Pesan Masuk',
}

const rateMap = new Map<string, { count: number; reset: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + 10 * 60 * 1000 })
    return false
  }
  if (entry.count >= 3) return true
  entry.count++
  return false
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Terlalu banyak permintaan. Coba lagi dalam beberapa menit.' },
      { status: 429 }
    )
  }

  let body: {
    name?: string
    email?: string
    company?: string
    topic?: string
    message?: string
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Format permintaan tidak valid.' }, { status: 400 })
  }

  const { name, email, company, topic, message } = body

  if (!name || !email || !topic || !message) {
    return NextResponse.json({ error: 'Semua kolom wajib diisi.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Format email tidak valid.' }, { status: 400 })
  }
  if (message.length > 3000) {
    return NextResponse.json({ error: 'Pesan terlalu panjang (maks. 3000 karakter).' }, { status: 400 })
  }

  const topicLabel = topicSubjectMap[topic] ?? 'Pesan Masuk'
  const subject = `[Nuii] ${topicLabel} — ${name}`
  const dateStr = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta',
  })

  const htmlBody = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;max-width:600px;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1e3a5f,#0f172a);padding:28px 32px;">
            <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Nuii IT Consulting</p>
            <p style="margin:4px 0 0;font-size:13px;color:#94a3b8;">Pesan baru dari formulir kontak website</p>
          </td>
        </tr>

        <!-- Topic badge -->
        <tr>
          <td style="padding:24px 32px 0;">
            <span style="display:inline-block;background:#1e3a5f;color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 12px;border-radius:20px;">${topicLabel}</span>
          </td>
        </tr>

        <!-- Sender info -->
        <tr>
          <td style="padding:20px 32px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;">
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">Pengirim</p>
                  <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#1e293b;">${escapeHtml(name)}</p>
                  <p style="margin:0 0 4px;font-size:13px;color:#3b82f6;"><a href="mailto:${escapeHtml(email)}" style="color:#3b82f6;text-decoration:none;">${escapeHtml(email)}</a></p>
                  ${company ? `<p style="margin:0;font-size:13px;color:#64748b;">${escapeHtml(company)}</p>` : ''}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:20px 32px;">
            <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">Pesan</p>
            <div style="background:#f8fafc;border-left:3px solid #f59e0b;border-radius:0 8px 8px 0;padding:16px 20px;font-size:14px;color:#334155;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</div>
          </td>
        </tr>

        <!-- Meta footer -->
        <tr>
          <td style="padding:0 32px 28px;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">Dikirim pada: ${dateStr} WIB</p>
          </td>
        </tr>

        <!-- Footer bar -->
        <tr>
          <td style="background:#0f172a;padding:16px 32px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#475569;">© 2026 Nuii IT Consulting · Jakarta, Indonesia</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`

  const textBody = `Pesan baru dari formulir kontak Nuii

Topik    : ${topicLabel}
Nama     : ${name}
Email    : ${email}
${company ? `Perusahaan: ${company}\n` : ''}Waktu    : ${dateStr} WIB

--- PESAN ---
${message}
-------------

© 2026 Nuii IT Consulting`

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Nuii IT Consulting" <${process.env.SMTP_USER}>`,
      to: RECIPIENT,
      cc: CC,
      replyTo: `"${name}" <${email}>`,
      subject,
      text: textBody,
      html: htmlBody,
      headers: {
        'X-Mailer': 'Nuii Website Mailer',
        'X-Priority': '3',
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] sendMail error:', err)
    return NextResponse.json(
      { error: 'Gagal mengirim pesan. Silakan coba lagi.' },
      { status: 500 }
    )
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
