import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

export const revalidate = 0

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await prisma.article.findUnique({
        where: { slug }
    })

    if (!article || !article.published) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Header */}
            <header className="bg-gray-800 bg-opacity-95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-700">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="font-medium">Kembali</span>
                        </Link>
                        <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            CMS Demo
                        </h1>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
                <article className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
                    {/* Article Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 sm:px-8 py-8 sm:py-12">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                            {article.title}
                        </h1>

                        {/* Date Info */}
                        <div className="flex items-center gap-2 text-white text-sm sm:text-base">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>
                                {new Date(article.createdAt).toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>

                    {/* Article Body */}
                    <div className="px-6 sm:px-8 py-8 sm:py-12">
                        <div className="prose prose-lg max-w-none">
                            {article.content.split('\n').map((paragraph: string, idx: number) => (
                                paragraph.trim() && (
                                    <p key={idx} className="mb-4 text-gray-300 text-base sm:text-lg leading-relaxed">
                                        {paragraph}
                                    </p>
                                )
                            ))}
                        </div>

                        {/* Article Footer */}
                        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="text-sm text-gray-400">
                                    Dipublikasikan pada {new Date(article.createdAt).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </div>
                                <Link
                                    href="/"
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>

                {/* CTA Section */}
                <div className="mt-8 sm:mt-12 bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-700 text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        Ingin berbagi cerita Anda?
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Bergabunglah dengan komunitas kami dan publikasikan artikel Anda
                    </p>
                    <Link
                        href="/admin"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                        Mulai Menulis
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 mt-12 sm:mt-16">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="text-center">
                        <h4 className="font-bold text-lg text-white mb-2">CMS Lite</h4>
                        <p className="text-sm text-gray-400">
                            Platform website sederhana untuk Masjid, Yayasan, UMKM, dan Komunitas RT/RW
                        </p>
                        <div className="mt-6">
                            <Link
                                href="/"
                                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                            >
                                Kembali ke Beranda →
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
