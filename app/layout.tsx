import type { Metadata } from "next";
import Script from "next/script";
import { Newsreader, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import "./globals.css";
import { SessionProvider } from "./providers";
import { getLocale } from "@/lib/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuiiapp.com";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

const DESC_ID =
  "NUII adalah perusahaan teknologi & R&D Indonesia yang merancang, membangun, dan menjalankan produknya sendiri — perangkat IoT, aplikasi, website, dan sistem. Terbuka untuk kerja sama pengembangan.";
const DESC_EN =
  "NUII is an Indonesian technology & R&D company that designs, builds, and runs its own products — IoT devices, apps, websites, and systems. Open to development partnerships.";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEn = locale === "en";
  const description = isEn ? DESC_EN : DESC_ID;
  const title = isEn
    ? "NUII — Technology & R&D Indonesia | Builder of IoT, Apps & Systems"
    : "NUII — Teknologi & R&D Indonesia | Pembuat Produk IoT, Aplikasi & Sistem";

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: "%s | NUII" },
    description,
    keywords: [
      "NUII",
      "perusahaan teknologi Indonesia",
      "R&D Indonesia",
      "pengembangan produk IoT",
      "perangkat IoT GPS BLE",
      "SAFAR tracking jamaah",
      "pengembangan aplikasi mobile",
      "pengembangan website & sistem",
      "aplikasi desktop",
      "kerja sama pengembangan teknologi",
      "white-label sistem pemantauan",
      "Wisezone ISP billing",
      "FIFA Pay PPOB",
      "Kharites membership",
    ],
    authors: [{ name: "NUII", url: SITE_URL }],
    creator: "NUII",
    publisher: "NUII",
    icons: {
      icon: [{ url: "/nuiiLogo.png", type: "image/png" }],
      apple: "/nuiiLogo.png",
      shortcut: "/nuiiLogo.png",
    },
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "id_ID",
      url: SITE_URL,
      siteName: "NUII",
      title,
      description,
      images: [
        { url: "/opengraph-image", width: 1200, height: 630, alt: "NUII — Teknologi & R&D Indonesia" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
      creator: "@nuiiapps",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
    alternates: { canonical: SITE_URL },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body suppressHydrationWarning>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#20413A",
                borderRadius: 6,
              },
            }}
          >
            <SessionProvider>
              {children}
            </SessionProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
