# Project Summary: CMS-Lite

This document provides an overview of the architecture, features, identified issues, and missing functionality of the **cms-lite** project.

## 1. Architecture & Tech Stack

- **Framework:** [Next.js 16.1.1](https://nextjs.org/) (App Router)
- **Library:** [React 19.2.3](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) & [Ant Design 6.2.0](https://ant.design/)
- **Animations:** [Framer Motion 12](https://www.framer.com/motion/)
- **Database & ORM:** [Prisma 7.5.0](https://www.prisma.io/) with SQLite (local) and support for Turso/libsql (production).
- **Authentication:** [NextAuth.js v5](https://authjs.dev/) (Credentials Provider)
- **Email:** [Nodemailer](https://nodemailer.com/)

## 2. Data Architecture (CMS Standard)

The database schema has been upgraded to support professional CMS requirements while maintaining high performance on limited database tiers (like Turso Free).

### Key Models
- **Article:** Supports excerpts, featured images, categories, tags, and SEO metadata.
- **Media:** Optimized for external storage. It stores public URLs and metadata rather than binary data, ensuring the Turso database remains extremely small and fast.
- **Category & Tag:** Flexible content organization with slug-based lookups.
- **User:** Role-based access control (ADMIN, EDITOR, AUTHOR) and profile bios.
- **Setting:** A key-value store for site-wide configuration (e.g., site name, social links).

## 3. Implemented Features

### Admin Dashboard
- **Authentication:** Secure login for administrators via `/admin/login`.
- **Statistics:** Real-time counters for total, published, and draft articles.
- **Quick Actions:** Shortcuts for creating and viewing articles.

### Article Management (CRUD)
- **Listing:** Search, filter (by status and date), and sort (newest, oldest, title) articles.
- **Creation/Editing:** Dedicated editor for writing articles with automatic slug generation and publishing toggles.
- **Deletion:** Articles can be removed with a confirmation dialog.

### Specialized Templates
- **Masjid Template:** A dedicated landing page for mosques with sections for prayer times and programs.
- **UMKM Template:** A dedicated landing page for small businesses with product showcase sections.

### Contact Integration
- **Contact API:** Supports form submissions with server-side validation and rate limiting.
- **Email Notifications:** Sends formatted emails to administrators upon new inquiries.

## 3. Potential Bugs & Issues

- **Slug Collisions:** The current implementation generates slugs from titles but does not check for uniqueness before saving. This will cause Prisma constraint errors if two articles share a title.
- **Scalability (Admin List):** The article listing page fetches the entire database table on the client side. This will lead to performance degradation as the content grows.
- **Hardcoded Template Content:** Most content in the `/masjid` and `/umkm` pages is hardcoded, meaning it cannot currently be updated through the CMS interface.
- **Missing API Validation:** Request bodies for article creation/updates are not strictly validated (e.g., using Zod), which could lead to inconsistent data.
- **Environmental Lockfile Noise:** The project shows sensitivity to development environments (Windows vs. Linux), which can clutter version control history.

## 4. Missing Typical CMS Features

- **Media Library:** No functionality for uploading, managing, or selecting images for articles or banners.
- **Rich Text / WYSIWYG Editor:** Articles are edited in a plain textarea. Standard CMS platforms typically offer TipTap, Quill, or Markdown support.
- **Global Settings Management:** No UI for managing site-wide configurations like site title, social media links, or contact details.
- **User & Role Management:** Only one hardcoded admin user is supported; there is no UI to add/remove users or assign different permissions.
- **SEO Optimization Tools:** Missing fields for per-page meta titles, descriptions, and OpenGraph tags in the editor.
- **Content Organization:** No support for categories, tags, or nested pages.
- **Revision History:** Lack of versioning or "draft save" history for content recovery.
