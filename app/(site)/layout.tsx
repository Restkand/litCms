import type { ReactNode } from "react"
import { getI18n } from "@/lib/i18n"
import Navbar from "@/app/components/site/Navbar"
import Footer from "@/app/components/site/Footer"

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const { locale, dict } = await getI18n()
  return (
    <div className="nuii-site min-h-screen">
      <Navbar dict={dict.nav} locale={locale} />
      {children}
      <Footer dict={dict} />
    </div>
  )
}
