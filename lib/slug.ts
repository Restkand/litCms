import { prisma } from "./prisma";

/**
 * Generates a unique slug from a title.
 * If the slug already exists, appends -1, -2, etc.
 *
 * @param title The title to slugify
 * @param currentId Optional ID of the article to exclude from uniqueness check (useful for updates)
 */
export async function generateUniqueSlug(title: string, currentId?: string): Promise<string> {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingArticle = await prisma.article.findFirst({
      where: {
        slug: slug,
        NOT: currentId ? { id: currentId } : undefined,
      },
      select: { id: true },
    });

    if (!existingArticle) {
      break;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
