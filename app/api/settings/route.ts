import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const settings = await prisma.setting.findMany({
    orderBy: { key: "asc" },
  });
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { key, value, description } = body;

  if (!key || value === undefined) {
    return NextResponse.json({ error: "Key and value are required" }, { status: 400 });
  }

  try {
    const setting = await prisma.setting.create({
      data: { key, value, description },
    });
    return NextResponse.json(setting);
  } catch (error) {
    console.error("Error creating setting:", error);
    return NextResponse.json({ error: "Setting key already exists" }, { status: 400 });
  }
}
