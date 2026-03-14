import Link from "next/link"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 10
  })

  console.log('Articles found:', articles.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Mobile-First Header */}
      <header className="bg-gray-800 bg-opacity-95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CMS Lite
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Solusi Website Sederhana untuk Komunitas
              </p>
            </div>
            <Link
              href="/admin"
              className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm sm:text-base font-medium hover:shadow-lg transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 sm:py-12 md:py-16 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Website Profesional untuk Semua
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Cocok untuk Masjid, Yayasan, UMKM, dan Komunitas RT/RW
            </p>

            {/* Stats - Mobile Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto mt-6 sm:mt-8">
              <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-700">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{articles.length}</div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">Artikel</div>
              </div>
              <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-700">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">✓</div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">Mudah</div>
              </div>
              <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-700">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">📱</div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">Mobile</div>
              </div>
              <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-700">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">⚡</div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">Cepat</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Mobile Grid */}
      <section className="py-6 sm:py-8 md:py-12 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-white">
            Kenapa Pilih CMS Lite?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Link href="/masjid" className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 sm:p-6 text-center hover:shadow-xl transition-all border border-gray-700 hover:border-blue-500 cursor-pointer group">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🕌</div>
              <h3 className="font-bold text-base sm:text-lg mb-2 text-white group-hover:text-blue-400 transition-colors">Untuk Masjid</h3>
              <p className="text-xs sm:text-sm text-gray-400">Publikasi jadwal, kajian, dan pengumuman masjid dengan mudah</p>
            </Link>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 sm:p-6 text-center hover:shadow-xl transition-all border border-gray-700 hover:border-purple-500">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎓</div>
              <h3 className="font-bold text-base sm:text-lg mb-2 text-white">Untuk Yayasan</h3>
              <p className="text-xs sm:text-sm text-gray-400">Berbagi program, kegiatan, dan laporan yayasan Anda</p>
            </div>
            <Link href="/umkm" className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 sm:p-6 text-center hover:shadow-xl transition-all border border-gray-700 hover:border-green-500 cursor-pointer group">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏪</div>
              <h3 className="font-bold text-base sm:text-lg mb-2 text-white group-hover:text-green-400 transition-colors">Untuk UMKM</h3>
              <p className="text-xs sm:text-sm text-gray-400">Promosikan produk dan layanan bisnis kecil Anda</p>
            </Link>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 sm:p-6 text-center hover:shadow-xl transition-all border border-gray-700 hover:border-orange-500">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏘️</div>
              <h3 className="font-bold text-base sm:text-lg mb-2 text-white">Untuk RT/RW</h3>
              <p className="text-xs sm:text-sm text-gray-400">Info warga, kegiatan, dan pengumuman lingkungan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section - Mobile Card Layout */}
      <main className="py-6 sm:py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Artikel Terbaru
            </h2>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
              <div className="text-5xl sm:text-6xl mb-4">📝</div>
              <p className="text-base sm:text-lg text-gray-400 mb-4">Belum ada artikel yang dipublikasikan</p>
              <Link
                href="/admin"
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Mulai Menulis
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {articles.map((article, index) => (
                <article
                  key={article.id}
                  className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group border border-gray-700 hover:border-blue-500"
                >
                  {/* Article Number Badge */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2">
                    <span className="text-white text-xs sm:text-sm font-medium">
                      Artikel #{articles.length - index}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5">
                    <Link href={`/article/${article.slug}`}>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {new Date(article.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-gray-400 line-clamp-3 mb-3 sm:mb-4">
                      {article.content.substring(0, 120)}...
                    </p>

                    <Link
                      href={`/article/${article.slug}`}
                      className="inline-flex items-center text-sm sm:text-base font-medium text-blue-400 hover:text-purple-400 transition-colors"
                    >
                      Baca selengkapnya
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer - Mobile Optimized */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h4 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4">CMS Lite</h4>
              <p className="text-sm sm:text-base text-gray-400">
                Platform website sederhana yang mudah digunakan untuk semua kalangan
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4">Cocok Untuk</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li>• Masjid & Musholla</li>
                <li>• Yayasan & Lembaga</li>
                <li>• UMKM & Bisnis Kecil</li>
                <li>• Komunitas RT/RW</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4">Kelola Website</h4>
              <Link
                href="/admin"
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:shadow-lg transition-all text-sm sm:text-base"
              >
                Login Admin
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              © 2026 CMS Lite. Dibuat dengan ❤️ untuk Komunitas Indonesia
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
