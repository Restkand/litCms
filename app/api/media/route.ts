import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(media);
}

/**
 * Note: This implementation expects the client to handle the actual binary upload
 * to an external provider (Cloudinary, Supabase, etc.) and then POST the resulting
 * metadata/URL here. This keeps the Turso DB light.
 */
export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { filename, url, key, mimeType, size, alt, width, height } = body;

  if (!filename || !url || !key) {
    return NextResponse.json({ error: "Missing required fields (filename, url, key)" }, { status: 400 });
  }

  try {
    const media = await prisma.media.create({
      data: {
        filename,
        url,
        key,
        mimeType: mimeType || "image/jpeg",
        size: size || 0,
        alt,
        width,
        height,
      },
    });
    return NextResponse.json(media);
  } catch (error) {
    console.error("Error creating media record:", error);
    return NextResponse.json({ error: "Failed to create media record" }, { status: 500 });
  }
}
