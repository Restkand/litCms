// Data produk NUII — sumber tunggal untuk halaman Produk, indeks hero & grid
// portofolio Beranda, dan tautan footer. Teks dwibahasa (ID/EN) inline.
// Foto asli diletakkan di /public/products/<id>.(png|jpg|webp); selama belum
// ada, <ProductShot> menampilkan placeholder bergaris sesuai desain.

export type Platform = "iot" | "mobile" | "web" | "desktop"
export type ProductStatus = "dev" | "field" | null
export type ShotLayout = "landscape" | "portrait"

export interface Product {
  id: string
  num: string
  name: string
  /** platform untuk filter & tag mono */
  platforms: Platform[]
  status: ProductStatus
  /** label oranye di halaman Produk (tanpa nomor urut) */
  eyebrowId: string
  eyebrowEn: string
  /** deskripsi panjang (halaman Produk) */
  descId: string
  descEn: string
  /** 4 chip fitur */
  featuresId: [string, string, string, string]
  featuresEn: [string, string, string, string]
  /** tag mono di bawah deskripsi */
  tags: string[]
  /** label kategori oranye di grid Beranda */
  gridLabelId: string
  gridLabelEn: string
  /** deskripsi pendek (grid Beranda) */
  gridId: string
  gridEn: string
  /** footer platform mono di grid Beranda, mis. "Web · Dashboard" */
  gridPlatform: string
  /** layout slot foto utama */
  shot: ShotLayout
  /** produk dwi-platform menampilkan slot mobile pendamping */
  companion: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: "safar",
    num: "01",
    name: "SAFAR",
    platforms: ["iot", "mobile"],
    status: "dev",
    eyebrowId: "Perangkat IoT · Tracking",
    eyebrowEn: "IoT Device · Tracking",
    descId:
      "Perangkat GPS + BLE yang menjaga jamaah haji & umroh tetap bersama rombongan. Muthawwif memantau pergerakan secara real-time lewat aplikasi; keluarga di rumah pun ikut tahu.",
    descEn:
      "A GPS + BLE device that keeps Hajj & Umrah pilgrims together with their group. The guide monitors movement in real time through the app; family back home stays informed too.",
    featuresId: [
      "Pelacakan GPS + BLE real-time",
      "Muthawwif pantau rombongan",
      "Keluarga di rumah ikut tahu",
      "SAFAR Mitra (B2B) & Personal",
    ],
    featuresEn: [
      "Real-time GPS + BLE tracking",
      "Guides monitor the whole group",
      "Family back home stays informed",
      "SAFAR Mitra (B2B) & Personal",
    ],
    tags: ["IoT", "GPS · BLE", "Mobile App"],
    gridLabelId: "Tracking",
    gridLabelEn: "Tracking",
    gridId:
      "Perangkat IoT GPS + BLE yang menjaga jamaah haji & umroh tetap bersama rombongan.",
    gridEn:
      "A GPS + BLE IoT device that keeps Hajj & Umrah pilgrims together with their group.",
    gridPlatform: "IoT · Mobile",
    shot: "landscape",
    companion: true,
  },
  {
    id: "sistem-pemantauan",
    num: "02",
    name: "Sistem Pemantauan Petugas",
    platforms: ["web"],
    status: "field",
    eyebrowId: "Web · Pemantauan",
    eyebrowEn: "Web · Monitoring",
    descId:
      "Solusi white-label untuk memantau tim lapangan secara real-time — sudah dipakai di beberapa pusat perbelanjaan besar di Jakarta, dengan identitas klien dirahasiakan.",
    descEn:
      "A white-label solution to monitor field teams in real time — already used in several large shopping centers in Jakarta, with client identities kept confidential.",
    featuresId: [
      "Pemantauan lapangan real-time",
      "White-label dengan merek Anda",
      "Dashboard terpusat",
      "Riwayat & laporan kehadiran",
    ],
    featuresEn: [
      "Real-time field monitoring",
      "White-label with your own brand",
      "Centralized dashboard",
      "Attendance history & reports",
    ],
    tags: ["Web", "White-label", "Dashboard"],
    gridLabelId: "Pemantauan",
    gridLabelEn: "Monitoring",
    gridId:
      "Solusi white-label, sudah dipakai di beberapa pusat perbelanjaan besar di Jakarta.",
    gridEn:
      "A white-label solution, already used in several large shopping centers in Jakarta.",
    gridPlatform: "Web · Dashboard",
    shot: "landscape",
    companion: false,
  },
  {
    id: "inventory-management",
    num: "03",
    name: "Inventory Management",
    platforms: ["desktop"],
    status: null,
    eyebrowId: "Desktop · Aset",
    eyebrowEn: "Desktop · Assets",
    descId:
      "Aplikasi desktop untuk pemantauan dan kontrol aset secara terpusat, dengan visibilitas penuh atas perangkat dan inventaris yang Anda kelola.",
    descEn:
      "A desktop application for centralized asset monitoring and control, with full visibility over the devices and inventory you manage.",
    featuresId: [
      "Kontrol aset terpusat",
      "Pemantauan inventaris",
      "Visibilitas perangkat",
      "Laporan operasional",
    ],
    featuresEn: [
      "Centralized asset control",
      "Inventory monitoring",
      "Device visibility",
      "Operational reports",
    ],
    tags: ["Desktop App", "Aset", "Monitoring"],
    gridLabelId: "Aset",
    gridLabelEn: "Assets",
    gridId: "Aplikasi desktop untuk pemantauan dan kontrol aset secara terpusat.",
    gridEn: "A desktop app for centralized asset monitoring and control.",
    gridPlatform: "Desktop",
    shot: "landscape",
    companion: false,
  },
  {
    id: "wisezone",
    num: "04",
    name: "Wisezone",
    platforms: ["web", "mobile"],
    status: null,
    eyebrowId: "Web · Mobile — ISP Billing",
    eyebrowEn: "Web · Mobile — ISP Billing",
    descId:
      "Platform ISP billing multi-tenant untuk Service Provider. Kelola ratusan site, ribuan pelanggan, dan billing otomatis dari satu dashboard — tanpa investasi infrastruktur sendiri.",
    descEn:
      "A multi-tenant ISP billing platform for Service Providers. Manage hundreds of sites, thousands of customers, and automated billing from a single dashboard — without your own infrastructure investment.",
    featuresId: [
      "Multi-tenant, ratusan site",
      "Billing otomatis",
      "SSO, Admin & Tenant Portal",
      "Sampai Mobile Apps",
    ],
    featuresEn: [
      "Multi-tenant, hundreds of sites",
      "Automated billing",
      "SSO, Admin & Tenant Portal",
      "Down to Mobile Apps",
    ],
    tags: ["Web", "Mobile", "Multi-tenant", "Billing"],
    gridLabelId: "ISP Billing",
    gridLabelEn: "ISP Billing",
    gridId:
      "Platform ISP billing multi-tenant — kelola ratusan site, ribuan pelanggan, dan billing otomatis dari satu dashboard.",
    gridEn:
      "A multi-tenant ISP billing platform — manage hundreds of sites, thousands of customers, and automated billing from one dashboard.",
    gridPlatform: "Web · Mobile",
    shot: "landscape",
    companion: true,
  },
  {
    id: "wimisec",
    num: "05",
    name: "Wimisec",
    platforms: ["web"],
    status: null,
    eyebrowId: "Web — E-Learning",
    eyebrowEn: "Web — E-Learning",
    descId:
      "Platform e-learning keamanan siber dengan UI/UX yang intuitif, dirancang untuk memudahkan pengguna mempelajari materi keamanan digital secara online.",
    descEn:
      "A cybersecurity e-learning platform with an intuitive UI/UX, designed to make it easy to study digital security material online.",
    featuresId: [
      "Materi keamanan siber",
      "UI/UX intuitif",
      "Belajar online, terstruktur",
      "Materi yang mudah diikuti",
    ],
    featuresEn: [
      "Cybersecurity material",
      "Intuitive UI/UX",
      "Structured online learning",
      "Easy-to-follow material",
    ],
    tags: ["Web", "E-Learning", "Keamanan Siber"],
    gridLabelId: "E-Learning",
    gridLabelEn: "E-Learning",
    gridId:
      "Platform e-learning keamanan siber dengan UI/UX intuitif untuk belajar keamanan digital secara online.",
    gridEn:
      "A cybersecurity e-learning platform with intuitive UI/UX for learning digital security online.",
    gridPlatform: "Web",
    shot: "landscape",
    companion: false,
  },
  {
    id: "fifa-pay",
    num: "06",
    name: "FIFA Pay",
    platforms: ["mobile"],
    status: null,
    eyebrowId: "Mobile — Pembayaran",
    eyebrowEn: "Mobile — Payments",
    descId:
      "Aplikasi pembayaran PPOB untuk berbagai kebutuhan transaksi digital — pulsa, tagihan, dan layanan lainnya, dalam satu genggaman.",
    descEn:
      "A PPOB payment app for a range of digital transactions — mobile credit, bills, and other services, all in one hand.",
    featuresId: [
      "PPOB lengkap",
      "Pulsa & tagihan",
      "Transaksi digital cepat",
      "Satu aplikasi, banyak layanan",
    ],
    featuresEn: [
      "Complete PPOB",
      "Credit & bills",
      "Fast digital transactions",
      "One app, many services",
    ],
    tags: ["Mobile App", "PPOB", "Pembayaran"],
    gridLabelId: "Pembayaran",
    gridLabelEn: "Payments",
    gridId: "Platform pembayaran PPOB untuk berbagai kebutuhan transaksi digital.",
    gridEn: "A PPOB payment platform for a range of digital transactions.",
    gridPlatform: "Mobile",
    shot: "portrait",
    companion: false,
  },
  {
    id: "nusatrade",
    num: "07",
    name: "Nusatrade",
    platforms: ["web"],
    status: null,
    eyebrowId: "Web — Edukasi",
    eyebrowEn: "Web — Education",
    descId:
      "Platform untuk menguasai logistik & perdagangan internasional — edukasi terstruktur tentang ekspor impor, kepabeanan, dokumen perdagangan, dan freight forwarding, dari dasar hingga mahir.",
    descEn:
      "A platform to master logistics & international trade — structured education on export-import, customs, trade documents, and freight forwarding, from basics to advanced.",
    featuresId: [
      "Ekspor impor & kepabeanan",
      "Dokumen perdagangan",
      "Freight forwarding",
      "Dari dasar hingga mahir",
    ],
    featuresEn: [
      "Export-import & customs",
      "Trade documents",
      "Freight forwarding",
      "From basics to advanced",
    ],
    tags: ["Web", "Edukasi", "Logistik"],
    gridLabelId: "Edukasi",
    gridLabelEn: "Education",
    gridId:
      "Platform edukasi ekspor-impor, kepabeanan, dokumen perdagangan, dan freight forwarding — dari dasar hingga mahir.",
    gridEn:
      "An export-import, customs, trade documents, and freight forwarding education platform — from basics to advanced.",
    gridPlatform: "Web",
    shot: "landscape",
    companion: false,
  },
  {
    id: "urro-academy",
    num: "08",
    name: "URRO Academy",
    platforms: ["web"],
    status: null,
    eyebrowId: "Web — E-Learning",
    eyebrowEn: "Web — E-Learning",
    descId:
      "Platform e-learning modern dengan sistem manajemen kursus lengkap, integrasi payment gateway untuk transaksi kelas online, dan UI/UX untuk pengalaman belajar yang nyaman.",
    descEn:
      "A modern e-learning platform with a complete course management system, payment gateway integration for online class transactions, and a UI/UX built for a comfortable learning experience.",
    featuresId: [
      "Manajemen kursus lengkap",
      "Integrasi payment gateway",
      "Transaksi kelas online",
      "UI/UX yang nyaman",
    ],
    featuresEn: [
      "Complete course management",
      "Payment gateway integration",
      "Online class transactions",
      "Comfortable UI/UX",
    ],
    tags: ["Web", "E-Learning", "Payment Gateway"],
    gridLabelId: "E-Learning",
    gridLabelEn: "E-Learning",
    gridId:
      "Platform e-learning modern dengan manajemen kursus lengkap dan integrasi payment gateway untuk kelas online.",
    gridEn:
      "A modern e-learning platform with complete course management and payment gateway integration for online classes.",
    gridPlatform: "Web",
    shot: "landscape",
    companion: false,
  },
  {
    id: "polda-sumbar",
    num: "09",
    name: "Polda Sumatera Barat",
    platforms: ["web"],
    status: null,
    eyebrowId: "Web — Sistem Informasi",
    eyebrowEn: "Web — Information System",
    descId:
      "Sistem informasi terintegrasi untuk Kepolisian Daerah Sumatera Barat dengan UI/UX profesional dan integrasi sistem internal yang aman dan efisien.",
    descEn:
      "An integrated information system for the West Sumatra Regional Police with a professional UI/UX and secure, efficient internal system integration.",
    featuresId: [
      "Sistem informasi terintegrasi",
      "Integrasi internal yang aman",
      "UI/UX profesional",
      "Efisien & andal",
    ],
    featuresEn: [
      "Integrated information system",
      "Secure internal integration",
      "Professional UI/UX",
      "Efficient & reliable",
    ],
    tags: ["Web", "Sistem Internal", "Keamanan"],
    gridLabelId: "Sistem Informasi",
    gridLabelEn: "Information System",
    gridId:
      "Sistem informasi terintegrasi untuk Kepolisian Daerah Sumatera Barat dengan integrasi internal yang aman.",
    gridEn:
      "An integrated information system for the West Sumatra Regional Police with secure internal integration.",
    gridPlatform: "Web",
    shot: "landscape",
    companion: false,
  },
  {
    id: "kharites",
    num: "10",
    name: "Kharites",
    platforms: ["mobile"],
    status: null,
    eyebrowId: "Mobile — Membership",
    eyebrowEn: "Mobile — Membership",
    descId:
      "Aplikasi untuk manajemen keanggotaan digital. Memudahkan organisasi dan komunitas mengelola data anggota, kartu member, poin, dan benefit dalam satu platform terintegrasi.",
    descEn:
      "An app for digital membership management. It helps organizations and communities manage member data, membership cards, points, and benefits in one integrated platform.",
    featuresId: [
      "Kartu member digital",
      "Data anggota terpusat",
      "Poin & loyalitas",
      "Notifikasi benefit anggota",
    ],
    featuresEn: [
      "Digital membership cards",
      "Centralized member data",
      "Points & loyalty",
      "Member benefit notifications",
    ],
    tags: ["Mobile App", "Membership", "Loyalitas"],
    gridLabelId: "Membership",
    gridLabelEn: "Membership",
    gridId: "Sistem keanggotaan untuk mengelola pelanggan, poin, dan loyalitas.",
    gridEn: "A membership system to manage customers, points, and loyalty.",
    gridPlatform: "Mobile",
    shot: "portrait",
    companion: false,
  },
  {
    id: "cms-dashboard",
    num: "11",
    name: "CMS Dashboard",
    platforms: ["web"],
    status: null,
    eyebrowId: "Web — Platform",
    eyebrowEn: "Web — Platform",
    descId:
      "Panel kontrol terpadu untuk mengelola konten dan operasi produk — fondasi yang dipakai lintas layanan NUII agar tim bisa bergerak cepat dan konsisten.",
    descEn:
      "A unified control panel to manage content and product operations — the foundation used across NUII services so the team can move fast and stay consistent.",
    featuresId: [
      "Kelola konten terpadu",
      "Operasi lintas produk",
      "Panel kontrol terpusat",
      "Fondasi produk NUII",
    ],
    featuresEn: [
      "Unified content management",
      "Cross-product operations",
      "Centralized control panel",
      "Foundation of NUII products",
    ],
    tags: ["Web", "CMS", "Platform"],
    gridLabelId: "Platform",
    gridLabelEn: "Platform",
    gridId: "Panel kontrol terpadu untuk mengelola konten dan operasi produk.",
    gridEn: "A unified control panel to manage content and product operations.",
    gridPlatform: "Web",
    shot: "landscape",
    companion: false,
  },
]

export const PRODUCT_FILTERS: { key: "all" | Platform; labelId: string; labelEn: string }[] = [
  { key: "all", labelId: "Semua", labelEn: "All" },
  { key: "iot", labelId: "IoT", labelEn: "IoT" },
  { key: "mobile", labelId: "Mobile", labelEn: "Mobile" },
  { key: "web", labelId: "Web", labelEn: "Web" },
  { key: "desktop", labelId: "Desktop", labelEn: "Desktop" },
]
