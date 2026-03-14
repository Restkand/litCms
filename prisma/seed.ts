import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const user = await prisma.user.upsert({
    where: { email: "admin@cms.com" },
    update: {},
    create: {
      email: "admin@cms.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log("✅ User created:", user.email);
  console.log("📧 Email: admin@cms.com");
  console.log("🔑 Password: admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
