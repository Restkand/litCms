import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import "./globals.css";
import { SessionProvider } from "./providers";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuiiapp.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Nuii — IT Consulting & Digital Solutions",
    template: "%s | Nuii",
  },
  description:
    "Nuii adalah firma konsultansi IT terpercaya yang membangun solusi digital — aplikasi mobile, web, backend, dan desktop — untuk komunitas dan bisnis Indonesia.",
  keywords: [
    "Nuii",
    "Nuii App",
    "Nuii IT Consulting",
    "konsultansi IT Indonesia",
    "pengembangan aplikasi mobile",
    "React Native Expo",
    "Next.js developer Indonesia",
    "WPF .NET desktop",
    "FIFA Pay",
    "Alfurqon CMS",
    "Kharites",
    "Asset Control",
    "software house Jakarta",
  ],
  authors: [{ name: "Nuii IT Consulting", url: SITE_URL }],
  creator: "Nuii IT Consulting",
  publisher: "Nuii IT Consulting",

  icons: {
    icon: [
      { url: "/nuiiLogo.png", type: "image/png" },
    ],
    apple: "/nuiiLogo.png",
    shortcut: "/nuiiLogo.png",
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "Nuii IT Consulting",
    title: "Nuii — IT Consulting & Digital Solutions",
    description:
      "Nuii membangun solusi digital inovatif — mobile, web, backend, dan desktop — untuk komunitas dan bisnis Indonesia.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nuii IT Consulting",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nuii — IT Consulting & Digital Solutions",
    description:
      "Nuii membangun solusi digital inovatif untuk komunitas dan bisnis Indonesia.",
    images: ["/og-image.png"],
    creator: "@nuiiapps",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#1890ff",
                borderRadius: 6,
              },
            }}
          >
            <SessionProvider>{children}</SessionProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
