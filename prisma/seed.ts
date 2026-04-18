import path from "path";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const dbPath = path.resolve(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  // ── Super Admin ───────────────────────────────────────────────────
  const superAdminPassword = await bcrypt.hash("superadmin123", 10);
  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@cms.com" },
    update: {},
    create: {
      email: "superadmin@cms.com",
      password: superAdminPassword,
      name: "Super Admin",
      role: "SUPER_ADMIN",
    },
  });

  // ── Admin ─────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@cms.com" },
    update: {},
    create: {
      email: "admin@cms.com",
      password: adminPassword,
      name: "Admin",
      role: "ADMIN",
    },
  });

  // ── Editor ────────────────────────────────────────────────────────
  const editorPassword = await bcrypt.hash("editor123", 10);
  const editor = await prisma.user.upsert({
    where: { email: "editor@cms.com" },
    update: {},
    create: {
      email: "editor@cms.com",
      password: editorPassword,
      name: "Editor",
      role: "EDITOR",
    },
  });

  // ── Author ────────────────────────────────────────────────────────
  const authorPassword = await bcrypt.hash("author123", 10);
  const author = await prisma.user.upsert({
    where: { email: "author@cms.com" },
    update: {},
    create: {
      email: "author@cms.com",
      password: authorPassword,
      name: "Author",
      role: "AUTHOR",
    },
  });

  console.log("\n✅ Seed selesai!\n");
  console.log("┌─────────────┬────────────────────────┬─────────────────┐");
  console.log("│ Role        │ Email                  │ Password        │");
  console.log("├─────────────┼────────────────────────┼─────────────────┤");
  console.log(`│ SUPER_ADMIN │ ${superAdmin.email.padEnd(22)} │ superadmin123   │`);
  console.log(`│ ADMIN       │ ${admin.email.padEnd(22)} │ admin123        │`);
  console.log(`│ EDITOR      │ ${editor.email.padEnd(22)} │ editor123       │`);
  console.log(`│ AUTHOR      │ ${author.email.padEnd(22)} │ author123       │`);
  console.log("└─────────────┴────────────────────────┴─────────────────┘\n");
  console.log("⚠️  Ganti semua password di atas setelah login pertama kali!\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

