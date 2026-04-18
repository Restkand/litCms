"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback, useMemo } from "react"
import { signOut } from "next-auth/react"
import { motion } from "framer-motion"
import {
  FaHome,
  FaFileAlt,
  FaSignOutAlt,
  FaSync,
  FaBars,
  FaTimes,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaTags,
  FaUsers,
  FaCog,
  FaLayerGroup
} from "react-icons/fa"
import { getAllowedMenus } from "@/lib/roles"

interface Article {
  id: string
  title: string
  published: boolean
  createdAt: string
  slug: string
}


export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const stats = useMemo(() => {
    const published = articles.filter((a) => a.published).length
    const draft = articles.filter((a) => !a.published).length
    return {
      total: articles.length,
      published,
      draft
    }
  }, [articles])

  const fetchArticles = useCallback(async () => {
    setLoading(true)
    const res = await fetch("/api/articles")
    const data = await res.json()
    setArticles(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    if (status === "authenticated") {
      const loadArticles = async () => {
        setLoading(true)
        const res = await fetch("/api/articles")
        const data = await res.json()
        setArticles(data)
        setLoading(false)
      }
      loadArticles()
    }
  }, [status])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const allMenuItems = [
    { title: "Dashboard", icon: FaHome, href: "/admin", active: true },
    { title: "Artikel", icon: FaFileAlt, href: "/admin/articles", active: false, count: stats.total },
    { title: "Kategori", icon: FaLayerGroup, href: "/admin/categories", active: false },
    { title: "Tag", icon: FaTags, href: "/admin/tags", active: false },
    { title: "User", icon: FaUsers, href: "/admin/users", active: false },
    { title: "Settings", icon: FaCog, href: "/admin/settings", active: false },
  ]

  const allowedMenus = getAllowedMenus(session.user.role ?? '')
  const menuItems = allMenuItems.filter(item => allowedMenus.has(item.href))

  const statsData = [
    {
      label: "Total Artikel",
      value: stats.total,
      icon: FaFileAlt,
      color: "#3b82f6",
      description: "Semua artikel"
    },
    {
      label: "Published",
      value: stats.published,
      icon: FaCheckCircle,
      color: "#10b981",
      description: "Artikel aktif"
    },
    {
      label: "Draft",
      value: stats.draft,
      icon: FaClock,
      color: "#f59e0b",
      description: "Belum publish"
    }
  ]

  const quickActions = [
    { title: "Buat Artikel Baru", icon: FaFileAlt, action: () => router.push("/admin/articles/new"), color: "#3b82f6" },
    { title: "Lihat Semua Artikel", icon: FaEye, action: () => router.push("/admin/articles"), color: "#10b981" }
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="sticky top-0 z-50 px-6 py-4 border-b bg-white bg-opacity-90 backdrop-blur-md border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>

            <h1 className="text-2xl font-bold text-gray-900">
              Admin Panel
            </h1>
            <div className="hidden sm:block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
              CMS Demo
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={fetchArticles}
              disabled={loading}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              title="Refresh"
            >
              <motion.div
                animate={loading ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
              >
                <FaSync size={16} className="text-gray-700" />
              </motion.div>
            </button>

            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-gray-900">
                  {session.user?.email}
                </div>
                <div className="text-xs text-gray-600">
                  Administrator
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {session.user?.email?.charAt(0).toUpperCase()}
              </div>
            </div>

            <button
              onClick={() => signOut()}
              className="p-2 rounded-lg hover:bg-red-50 transition-colors text-red-600"
              title="Logout"
            >
              <FaSignOutAlt size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <aside
          className={`w-64 min-h-screen border-r bg-white fixed lg:relative z-50 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            } border-gray-200`}
        >
          <nav className="p-6">
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.button
                    key={item.title}
                    onClick={() => {
                      router.push(item.href)
                      setIsMobileMenuOpen(false)
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 w-full text-left ${item.active ? "shadow-md bg-blue-50 text-blue-600" : "text-gray-700"
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon size={18} />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    {item.count !== undefined && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                        {item.count}
                      </span>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold mb-2 text-gray-900">
              Selamat datang! 👋
            </h2>
            <p className="text-lg text-gray-600">
              Kelola artikel Anda dengan mudah dari dashboard ini
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {statsData.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 rounded-xl border bg-white hover:shadow-lg transition-all duration-300 border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: stat.color + "20" }}
                    >
                      <Icon size={24} style={{ color: stat.color }} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.description}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="xl:col-span-2"
            >
              <div className="p-6 rounded-xl border bg-white border-gray-200">
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  Aksi Cepat
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quickActions.map((action) => {
                    const Icon = action.icon
                    return (
                      <button
                        key={action.title}
                        onClick={action.action}
                        className="p-4 rounded-lg border-2 border-dashed transition-all duration-200 hover:border-solid hover:shadow-md hover:scale-105 text-left"
                        style={{ borderColor: action.color + "40", color: action.color }}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon size={18} />
                          <span className="font-medium">{action.title}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="p-6 rounded-xl border bg-white border-gray-200">
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  Artikel Terbaru
                </h3>
                <div className="space-y-4">
                  {articles.slice(0, 5).map((article) => (
                    <div key={article.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <FaFileAlt size={14} className="text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {article.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatDate(article.createdAt)}
                        </div>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${article.published
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                            }`}
                        >
                          {article.published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                  ))}
                  {articles.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <FaFileAlt size={24} className="text-gray-400" />
                      </div>
                      <div className="text-sm font-medium text-gray-600 mb-1">
                        Belum ada artikel
                      </div>
                      <div className="text-xs text-gray-500">
                        Artikel terbaru akan muncul di sini
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}