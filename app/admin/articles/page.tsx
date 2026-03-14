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
    FaEdit,
    FaPlus,
    FaTrash,
    FaSearch
} from "react-icons/fa"

interface Article {
    id: string
    title: string
    published: boolean
    createdAt: string
    slug: string
}

export default function ArticlesPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all")
    const [filterDate, setFilterDate] = useState<"all" | "today" | "week" | "month">("all")
    const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest")

    const fetchArticles = useCallback(async () => {
        setLoading(true)
        const res = await fetch("/api/articles")
        const data = await res.json()
        setArticles(data)
        setLoading(false)
    }, [])

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Apakah Anda yakin ingin menghapus artikel "${title}"?`)) {
            return
        }

        setDeletingId(id)
        try {
            const res = await fetch(`/api/articles/${id}`, {
                method: "DELETE"
            })

            if (res.ok) {
                setArticles(articles.filter(a => a.id !== id))
                alert("Artikel berhasil dihapus!")
            } else {
                alert("Gagal menghapus artikel")
            }
        } catch (error) {
            console.error("Error deleting article:", error)
            alert("Terjadi kesalahan saat menghapus artikel")
        } finally {
            setDeletingId(null)
        }
    }

    const filteredArticles = useMemo(() => {
        let filtered = [...articles]

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Filter by status
        if (filterStatus !== "all") {
            filtered = filtered.filter(article =>
                filterStatus === "published" ? article.published : !article.published
            )
        }

        // Filter by date
        if (filterDate !== "all") {
            const now = new Date()
            filtered = filtered.filter(article => {
                const articleDate = new Date(article.createdAt)
                const diffTime = now.getTime() - articleDate.getTime()
                const diffDays = diffTime / (1000 * 3600 * 24)

                if (filterDate === "today") return diffDays < 1
                if (filterDate === "week") return diffDays < 7
                if (filterDate === "month") return diffDays < 30
                return true
            })
        }

        // Sort
        filtered.sort((a, b) => {
            if (sortBy === "newest") {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            } else if (sortBy === "oldest") {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            } else {
                return a.title.localeCompare(b.title)
            }
        })

        return filtered
    }, [articles, searchQuery, filterStatus, filterDate, sortBy])

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
                            onClick={() => router.push("/admin")}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <FaHome size={18} className="text-gray-700" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Kelola Artikel
                        </h1>
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

                        <button
                            onClick={() => router.push("/admin/articles/new")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 flex items-center space-x-2"
                        >
                            <FaPlus size={16} />
                            <span className="hidden sm:inline">Buat Baru</span>
                        </button>

                        <div className="flex items-center space-x-3">
                            <div className="text-right hidden md:block">
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

            <main className="p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Daftar Artikel</h2>
                                <p className="text-gray-600">
                                    {filteredArticles.length} dari {articles.length} artikel
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Filter and Search Section */}
                    <div className="mb-6 bg-white rounded-xl border border-gray-200 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                                <input
                                    type="text"
                                    placeholder="Cari artikel..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Filter Status */}
                            <div>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value as "all" | "published" | "draft")}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>

                            {/* Filter Date */}
                            <div>
                                <select
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value as "all" | "today" | "week" | "month")}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">Semua Waktu</option>
                                    <option value="today">Hari Ini</option>
                                    <option value="week">7 Hari Terakhir</option>
                                    <option value="month">30 Hari Terakhir</option>
                                </select>
                            </div>

                            {/* Sort */}
                            <div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "title")}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="newest">Terbaru</option>
                                    <option value="oldest">Terlama</option>
                                    <option value="title">Judul (A-Z)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                    ) : filteredArticles.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                            <FaFileAlt size={48} className="mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-600 mb-2">
                                {searchQuery || filterStatus !== "all" || filterDate !== "all"
                                    ? "Tidak ada artikel yang sesuai dengan filter"
                                    : "Belum ada artikel"}
                            </p>
                            {!searchQuery && filterStatus === "all" && filterDate === "all" && (
                                <button
                                    onClick={() => router.push("/admin/articles/new")}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-2"
                                >
                                    Buat Artikel Pertama
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            {/* Table Header */}
                            <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-700">
                                <div className="col-span-5">Judul</div>
                                <div className="col-span-2">Status</div>
                                <div className="col-span-3">Tanggal</div>
                                <div className="col-span-2 text-right">Aksi</div>
                            </div>

                            {/* Table Body */}
                            <div className="divide-y divide-gray-200">
                                {filteredArticles.map((article, index) => (
                                    <motion.div
                                        key={article.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="px-6 py-4 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                            {/* Title */}
                                            <div className="col-span-12 md:col-span-5">
                                                <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => router.push(`/admin/articles/${article.id}`)}>
                                                    {article.title}
                                                </h3>
                                            </div>

                                            {/* Status */}
                                            <div className="col-span-12 md:col-span-2">
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${article.published
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                        }`}
                                                >
                                                    {article.published ? "Published" : "Draft"}
                                                </span>
                                            </div>

                                            {/* Date */}
                                            <div className="col-span-12 md:col-span-3 text-sm text-gray-600">
                                                {formatDate(article.createdAt)}
                                            </div>

                                            {/* Actions */}
                                            <div className="col-span-12 md:col-span-2 flex items-center justify-start md:justify-end space-x-2">
                                                <button
                                                    onClick={() => router.push(`/admin/articles/${article.id}`)}
                                                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                                    title="Edit"
                                                >
                                                    <FaEdit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(article.id, article.title)}
                                                    disabled={deletingId === article.id}
                                                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                                                    title="Hapus"
                                                >
                                                    {deletingId === article.id ? (
                                                        <div className="w-4 h-4 border-2 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                                                    ) : (
                                                        <FaTrash size={16} />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
