import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { canManageUsers } from "@/lib/roles";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!canManageUsers(session.user.role)) {
    return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      _count: {
        select: { articles: true }
      }
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!canManageUsers(session.user.role)) {
    return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
  }

  const body = await request.json();
  const { name, email, password, role } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Only SUPER_ADMIN can create another SUPER_ADMIN
  if (role === "SUPER_ADMIN" && session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden: Only Super Admin can create Super Admin accounts" }, { status: 403 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "AUTHOR",
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Email already exists" }, { status: 400 });
  }
}
