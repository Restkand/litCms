import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { auth } from "@/lib/auth";
import { canManageUsers, isSuperAdmin } from "@/lib/roles";
import bcrypt from "bcryptjs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Users can read their own profile; admins can read any
  if (session.user.id !== id && !canManageUsers(session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      bio: true,
      image: true,
      createdAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const sessionRole = session.user.role;

  // Self-edit allowed; admins can edit anyone
  if (session.user.id !== id && !canManageUsers(sessionRole)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Fetch target user to check their role
  const targetUser = await prisma.user.findUnique({
    where: { id },
    select: { role: true },
  });

  if (!targetUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Only SUPER_ADMIN can edit another SUPER_ADMIN
  if (isSuperAdmin(targetUser.role) && !isSuperAdmin(sessionRole)) {
    return NextResponse.json({ error: "Forbidden: Cannot edit Super Admin" }, { status: 403 });
  }

  const body = await request.json();
  const { name, email, password, role, bio } = body;

  const data: {
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
    bio?: string;
  } = { name, email, bio };

  // Role changes: only SUPER_ADMIN can assign SUPER_ADMIN; ADMIN can assign others
  if (role && canManageUsers(sessionRole)) {
    if (role === "SUPER_ADMIN" && !isSuperAdmin(sessionRole)) {
      return NextResponse.json({ error: "Forbidden: Only Super Admin can assign Super Admin role" }, { status: 403 });
    }
    data.role = role as Role;
  }

  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data,
    });

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!canManageUsers(session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  // Cannot delete yourself
  if (id === session.user.id) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
  }

  // SUPER_ADMIN can never be deleted via API
  const targetUser = await prisma.user.findUnique({
    where: { id },
    select: { role: true },
  });

  if (!targetUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (isSuperAdmin(targetUser.role)) {
    return NextResponse.json({ error: "Forbidden: Super Admin cannot be deleted" }, { status: 403 });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user. They might have associated articles." }, { status: 400 });
  }
}
