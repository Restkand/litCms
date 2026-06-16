/**
 * Migrasi multi-bahasa untuk Turso (produksi/Vercel).
 * Menambahkan kolom EN nullable ke tabel "Article" secara idempoten.
 * Non-destruktif: kolom baru kosong, data artikel lama tetap utuh.
 *
 * Jalankan SEKALI sebelum/sesudah deploy: node prisma/migrate-turso-en.mjs
 * Aman dijalankan berulang (kolom yang sudah ada akan dilewati).
 */

import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const value = trimmed.slice(eqIdx + 1).trim();
  if (!process.env[key]) process.env[key] = value;
}

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN;

if (!DATABASE_URL || DATABASE_URL.startsWith("file:")) {
  console.error("❌ DATABASE_URL tidak ditemukan atau masih pakai file lokal di .env.local");
  process.exit(1);
}

const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });

async function migrate() {
  console.log("🔌 Connecting to Turso:", DATABASE_URL);
  console.log("\n🚀 Menjalankan migration: add_article_en_fields\n");

  const columns = [
    { name: "titleEn", sql: `ALTER TABLE "Article" ADD COLUMN "titleEn" TEXT` },
    { name: "excerptEn", sql: `ALTER TABLE "Article" ADD COLUMN "excerptEn" TEXT` },
    { name: "contentEn", sql: `ALTER TABLE "Article" ADD COLUMN "contentEn" TEXT` },
    { name: "metaTitleEn", sql: `ALTER TABLE "Article" ADD COLUMN "metaTitleEn" TEXT` },
    { name: "metaDescriptionEn", sql: `ALTER TABLE "Article" ADD COLUMN "metaDescriptionEn" TEXT` },
  ];

  for (const col of columns) {
    try {
      await client.execute(col.sql);
      console.log(`  ✅ Article.${col.name} ditambahkan`);
    } catch (e) {
      if (e.message?.includes("duplicate column")) {
        console.log(`  ⏭️  Article.${col.name} sudah ada, dilewati`);
      } else {
        throw e;
      }
    }
  }

  console.log("\n✅ Migration selesai! Kolom EN artikel sudah tersedia di Turso.");
}

migrate()
  .catch((e) => {
    console.error("\n❌ Migration gagal:", e.message);
    process.exit(1);
  })
  .finally(() => client.close());
