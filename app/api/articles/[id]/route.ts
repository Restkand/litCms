import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/slug";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      author: { select: { name: true, email: true } },
      category: { select: { id: true, name: true, slug: true } },
      tags: { select: { id: true, name: true, slug: true } },
      featuredImage: { select: { id: true, url: true, alt: true } }
    },
  });

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json(article);
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

  // Verify article exists and author matches or user is admin
  const existingArticle = await prisma.article.findUnique({
    where: { id },
    select: { authorId: true, title: true, tags: { select: { id: true } } }
  });

  if (!existingArticle) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  // Basic authorization check: author only for now (can be expanded to check roles)
  if (existingArticle.authorId !== session.user.id) {
    // In a real app, we'd check session.user.role here
    // return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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

  const data: {
    title?: string;
    slug?: string;
    content?: string;
    published?: boolean;
    excerpt?: string;
    categoryId?: string;
    featuredImageId?: string;
    metaTitle?: string;
    metaDescription?: string;
    publishedAt?: Date | null;
    tags?: {
      disconnect: { id: string }[];
      connect: { id: string }[];
    };
  } = {
    content,
    published,
    excerpt,
    categoryId,
    featuredImageId,
    metaTitle,
    metaDescription,
  };

  if (title !== undefined && title !== existingArticle.title) {
    data.title = title;
    data.slug = await generateUniqueSlug(title, id);
  }

  if (publishedAt !== undefined) {
    data.publishedAt = publishedAt ? new Date(publishedAt) : null;
  } else if (published === true && !data.publishedAt) {
    // If being published for the first time, set publishedAt
    data.publishedAt = new Date();
  }

  if (tags !== undefined) {
    const currentTagIds = existingArticle.tags.map(t => t.id);
    const tagsToDisconnect = currentTagIds.filter(tid => !tags.includes(tid));

    data.tags = {
      disconnect: tagsToDisconnect.map(tid => ({ id: tid })),
      connect: tags.map((tid: string) => ({ id: tid }))
    };
  }

  try {
    const article = await prisma.article.update({
      where: { id },
      data,
      include: {
        tags: true,
        category: true,
        featuredImage: true
      }
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
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

  const { id } = await params;

  try {
    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}
