import Link from "next/link"

export default function ProfilPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <header className="bg-gray-800 bg-opacity-95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-700">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="font-medium">Beranda</span>
                        </Link>
                        <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Profil UMKM
                        </h1>
                        <Link
                            href="/admin"
                            className="px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </header>

            <section className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="text-center text-white">
                            <div className="text-6xl mb-4">📸</div>
                            <p className="text-sm text-gray-200">Banner Image Placeholder</p>
                            <p className="text-xs text-gray-300 mt-1">1200 x 400 px</p>
                        </div>
                    </div>
                </div>
                <div className="relative h-full flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                            Toko Berkah Jaya
                        </h1>
                        <p className="text-lg sm:text-xl text-blue-100">
                            UMKM Produk Makanan Ringan Lokal
                        </p>
                    </div>
                </div>
            </section>

            <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
                <section className="mb-12 sm:mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-700">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center">
                                <span className="text-3xl mr-3">🏪</span>
                                Tentang Kami
                            </h2>
                            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                                Toko Berkah Jaya adalah usaha mikro kecil menengah yang bergerak di bidang produksi makanan ringan tradisional.
                                Kami telah berdiri sejak tahun 2018 dan berkomitmen untuk menyediakan produk berkualitas tinggi dengan harga terjangkau.
                            </p>
                            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                                Dengan bahan-bahan pilihan dan proses produksi yang higienis, kami menghadirkan cita rasa khas Indonesia yang
                                autentik untuk setiap pelanggan kami.
                            </p>
                        </div>

                        <div className="bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-700">
                            <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center border-2 border-gray-600">
                                <div className="text-center text-gray-400">
                                    <div className="text-8xl mb-4">🏢</div>
                                    <p className="text-sm">Logo / Foto Usaha</p>
                                    <p className="text-xs mt-1">500 x 500 px</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
                        Produk Unggulan
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all group">
                            <div className="aspect-square bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <div className="text-6xl mb-2">🍪</div>
                                    <p className="text-xs">Foto Produk</p>
                                    <p className="text-xs opacity-75">400 x 400 px</p>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                    Kue Kering Premium
                                </h3>
                                <p className="text-gray-400 text-sm mb-3">
                                    Aneka kue kering dengan berbagai varian rasa, cocok untuk oleh-oleh atau camilan keluarga.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-400 font-bold text-lg">Rp 50.000</span>
                                    <span className="text-xs text-gray-500">per toples</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all group">
                            <div className="aspect-square bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <div className="text-6xl mb-2">🥜</div>
                                    <p className="text-xs">Foto Produk</p>
                                    <p className="text-xs opacity-75">400 x 400 px</p>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                    Kacang Mete Madu
                                </h3>
                                <p className="text-gray-400 text-sm mb-3">
                                    Kacang mete pilihan dengan balutan madu asli, renyah dan manis.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-400 font-bold text-lg">Rp 35.000</span>
                                    <span className="text-xs text-gray-500">per pack 250gr</span>
                                </div>
                            </div>
                        </div>

                        {/* Produk 3 */}
                        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all group">
                            <div className="aspect-square bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <div className="text-6xl mb-2">🍘</div>
                                    <p className="text-xs">Foto Produk</p>
                                    <p className="text-xs opacity-75">400 x 400 px</p>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                    Keripik Singkong
                                </h3>
                                <p className="text-gray-400 text-sm mb-3">
                                    Keripik singkong renyah dengan berbagai varian rasa pedas, original, dan balado.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-400 font-bold text-lg">Rp 15.000</span>
                                    <span className="text-xs text-gray-500">per pack 200gr</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Kontak & Lokasi */}
                <section className="mb-12 sm:mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Informasi Kontak */}
                        <div className="bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-700">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center">
                                <span className="text-3xl mr-3">📞</span>
                                Hubungi Kami
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Telepon / WhatsApp</p>
                                        <p className="text-white font-medium">+62 812-3456-7890</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Email</p>
                                        <p className="text-white font-medium">berkahjaya@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Alamat</p>
                                        <p className="text-white font-medium">
                                            Jl. Merdeka No. 123, Kelurahan Sukamaju,<br />
                                            Kecamatan Berkah, Jakarta Selatan 12345
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Jam Operasional</p>
                                        <p className="text-white font-medium">
                                            Senin - Sabtu: 08.00 - 17.00 WIB<br />
                                            Minggu: Tutup
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-700">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center">
                                <span className="text-3xl mr-3">🗺️</span>
                                Lokasi
                            </h2>
                            <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center border-2 border-gray-600">
                                <div className="text-center text-gray-400">
                                    <div className="text-6xl mb-3">📍</div>
                                    <p className="text-sm font-medium">Google Maps Embed</p>
                                    <p className="text-xs mt-2 max-w-xs mx-auto">
                                        Embed Google Maps iframe di sini untuk menampilkan lokasi usaha Anda
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Media */}
                <section className="mb-12 sm:mb-16">
                    <div className="bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-700">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                            Ikuti Kami di Media Sosial
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="#" className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-lg hover:shadow-xl text-white">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="font-medium">Facebook</span>
                            </a>
                            <a href="#" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all shadow-lg hover:shadow-xl text-white">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                </svg>
                                <span className="font-medium">Instagram</span>
                            </a>
                            <a href="#" className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-all shadow-lg hover:shadow-xl text-white">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                <span className="font-medium">WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 py-8">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2026 Toko Berkah Jaya. Dibuat dengan CMS Lite
                    </p>
                    <div className="mt-4">
                        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                            Kembali ke Beranda →
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
