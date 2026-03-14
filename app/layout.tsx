import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import "./globals.css";
import { SessionProvider } from "./providers";

export const metadata: Metadata = {
  title: "CMS Lite",
  description: "Simple Content Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
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
