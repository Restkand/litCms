import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'Our Experience', href: '#experience' },
  { label: 'Our Products', href: '#products' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact Us', href: '#contact' },
]

const services = [
  { label: 'Mobile Development', href: '#products' },
  { label: 'Web & CMS', href: '#products' },
  { label: 'Backend & API', href: '#products' },
  { label: 'Desktop Application', href: '#products' },
  { label: 'UI/UX Design', href: '#products' },
]

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/nuiiapps',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:nuiiapps3@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/angga-saputra16/',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 border-t border-gray-800/60">

      {/* Main footer body */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-xl blur-xl opacity-20 bg-amber-400 scale-110 pointer-events-none" />
                <div className="relative w-10 h-10 rounded-xl border border-gray-700/60 bg-gray-900/80 flex items-center justify-center">
                  <Image
                    src="/nuiiLogo.png"
                    alt="Nuii"
                    width={36}
                    height={36}
                    className="w-7 h-7 object-contain"
                    style={{ filter: 'invert(1) sepia(1) saturate(0) brightness(1.15)' }}
                  />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">Nuii</span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Firma konsultansi IT terpercaya yang membangun solusi digital inovatif untuk komunitas dan bisnis Indonesia — dari ide awal hingga produk nyata.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-1">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500 hover:text-amber-400 hover:border-amber-400/40 transition-all duration-200"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400 mb-5">Navigasi</p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors duration-150"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/admin" className="text-sm text-gray-500 hover:text-white transition-colors duration-150">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400 mb-5">Layanan</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors duration-150"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800/60">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {year} <span className="text-gray-500 font-medium">Nuii IT Consulting</span>. All rights reserved.
          </p>
          <p className="text-xs text-gray-700">
            Dibuat dengan <span className="text-amber-400/60">♥</span> untuk Indonesia
          </p>
        </div>
      </div>

    </footer>
  )
}
