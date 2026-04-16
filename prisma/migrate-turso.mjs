/**
 * Script untuk apply migration schema baru ke Turso:
 * - Tambah kolom baru ke User dan Article
 * - Buat tabel Category, Tag, Media, Setting, _ArticleToTag
 *
 * Jalankan: node prisma/migrate-turso.mjs
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

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});

async function migrate() {
  console.log("🔌 Connecting to Turso:", DATABASE_URL);
  console.log("\n🚀 Menjalankan migration: add_cms_models\n");

  // ── 1. Tambah kolom baru ke User ───────────────────────────────────────────
  const userColumns = [
    { name: "role", sql: `ALTER TABLE "User" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'AUTHOR'` },
    { name: "bio",  sql: `ALTER TABLE "User" ADD COLUMN "bio" TEXT` },
    { name: "image",sql: `ALTER TABLE "User" ADD COLUMN "image" TEXT` },
  ];

  for (const col of userColumns) {
    try {
      await client.execute(col.sql);
      console.log(`  ✅ User.${col.name} ditambahkan`);
    } catch (e) {
      if (e.message?.includes("duplicate column")) {
        console.log(`  ⏭️  User.${col.name} sudah ada, dilewati`);
      } else {
        throw e;
      }
    }
  }

  // ── 2. Tambah kolom baru ke Article ───────────────────────────────────────
  const articleColumns = [
    { name: "excerpt",         sql: `ALTER TABLE "Article" ADD COLUMN "excerpt" TEXT` },
    { name: "publishedAt",     sql: `ALTER TABLE "Article" ADD COLUMN "publishedAt" DATETIME` },
    { name: "categoryId",      sql: `ALTER TABLE "Article" ADD COLUMN "categoryId" TEXT` },
    { name: "featuredImageId", sql: `ALTER TABLE "Article" ADD COLUMN "featuredImageId" TEXT` },
    { name: "metaTitle",       sql: `ALTER TABLE "Article" ADD COLUMN "metaTitle" TEXT` },
    { name: "metaDescription", sql: `ALTER TABLE "Article" ADD COLUMN "metaDescription" TEXT` },
  ];

  for (const col of articleColumns) {
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

  // ── 3. Buat tabel-tabel baru ───────────────────────────────────────────────
  await client.execute(`
    CREATE TABLE IF NOT EXISTS "Category" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "description" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("  ✅ Tabel Category");

  await client.execute(`CREATE UNIQUE INDEX IF NOT EXISTS "Category_name_key" ON "Category"("name")`);
  await client.execute(`CREATE UNIQUE INDEX IF NOT EXISTS "Category_slug_key" ON "Category"("slug")`);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS "Tag" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("  ✅ Tabel Tag");

  await client.execute(`CREATE UNIQUE INDEX IF NOT EXISTS "Tag_name_key" ON "Tag"("name")`);
  await client.execute(`CREATE UNIQUE INDEX IF NOT EXISTS "Tag_slug_key" ON "Tag"("slug")`);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS "Media" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "filename" TEXT NOT NULL,
      "url" TEXT NOT NULL,
      "key" TEXT NOT NULL,
      "mimeType" TEXT NOT NULL,
      "size" INTEGER NOT NULL,
      "alt" TEXT,
      "width" INTEGER,
      "height" INTEGER,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("  ✅ Tabel Media");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS "Setting" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "key" TEXT NOT NULL,
      "value" TEXT NOT NULL,
      "description" TEXT,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("  ✅ Tabel Setting");

  await client.execute(`CREATE UNIQUE INDEX IF NOT EXISTS "Setting_key_key" ON "Setting"("key")`);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS "_ArticleToTag" (
      "A" TEXT NOT NULL,
      "B" TEXT NOT NULL,
      CONSTRAINT "_ArticleToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Article" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT "_ArticleToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
    )
  `);
  console.log("  ✅ Tabel _ArticleToTag (relasi banyak-ke-banyak)");

  await client.execute(`CREATE UNIQUE INDEX IF NOT EXISTS "_ArticleToTag_AB_unique" ON "_ArticleToTag"("A", "B")`);
  await client.execute(`CREATE INDEX IF NOT EXISTS "_ArticleToTag_B_index" ON "_ArticleToTag"("B")`);

  // ── 4. Tambah index baru di Article ───────────────────────────────────────
  try {
    await client.execute(`CREATE INDEX IF NOT EXISTS "Article_authorId_idx" ON "Article"("authorId")`);
    await client.execute(`CREATE INDEX IF NOT EXISTS "Article_categoryId_idx" ON "Article"("categoryId")`);
    await client.execute(`CREATE INDEX IF NOT EXISTS "Article_slug_idx" ON "Article"("slug")`);
    console.log("  ✅ Index Article ditambahkan");
  } catch (e) {
    console.log("  ⏭️  Index sudah ada, dilewati");
  }

  console.log("\n✅ Migration selesai! Semua tabel CMS baru sudah tersedia di Turso.");
}

migrate()
  .catch((e) => {
    console.error("\n❌ Migration gagal:", e.message);
    process.exit(1);
  })
  .finally(() => client.close());
