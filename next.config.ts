import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "better-sqlite3",
    "@prisma/adapter-better-sqlite3",
    "@libsql/client",
    "@libsql/hrana-client",
    "@prisma/adapter-libsql",
    "@prisma/client",
    "prisma",
  ],
};

export default nextConfig;
