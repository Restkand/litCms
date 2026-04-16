import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/slug";

export async function GET() {
  const articles = await prisma.article.findMany({
    include: {
      author: { select: { name: true, email: true } },
      category: { select: { name: true, slug: true } },
      tags: { select: { name: true, slug: true } },
      featuredImage: { select: { url: true, alt: true } }
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    title,
    content,
    published,
    excerpt,
    categoryId,
    tags, // Expected as array of IDs: string[]
    featuredImageId,
    metaTitle,
    metaDescription,
    publishedAt
  } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }

  const slug = await generateUniqueSlug(title);

  try {
    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        published: published ?? false,
        publishedAt: publishedAt ? new Date(publishedAt) : (published ? new Date() : null),
        authorId: session.user.id,
        categoryId,
        featuredImageId,
        metaTitle,
        metaDescription,
        tags: tags ? {
          connect: tags.map((id: string) => ({ id }))
        } : undefined
      },
      include: {
        tags: true,
        category: true,
        featuredImage: true
      }
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
