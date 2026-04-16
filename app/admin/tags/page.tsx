"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    FaHome,
    FaTags,
    FaPlus,
    FaEdit,
    FaTrash,
    FaSync,
    FaArrowLeft,
    FaTimes,
    FaSave
} from "react-icons/fa"

interface Tag {
    id: string
    name: string
    slug: string
    _count?: {
        articles: number
    }
}

export default function TagsPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [tags, setTags] = useState<Tag[]>([])
    const [loading, setLoading] = useState(true)

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingTag, setEditingTag] = useState<Tag | null>(null)
    const [tagName, setTagName] = useState("")
    const [isSaving, setIsSaving] = useState(false)

    const fetchTags = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/tags")
            const data = await res.json()
            setTags(data)
        } catch (error) {
            console.error("Failed to fetch tags:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login")
            return
        }
        if (status === "authenticated") {
            fetchTags()
        }
    }, [status, router, fetchTags])

    const handleOpenModal = (tag: Tag | null = null) => {
        setEditingTag(tag)
        setTagName(tag ? tag.name : "")
        setIsModalOpen(true)
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!tagName.trim()) return

        setIsSaving(true)
        try {
            const url = editingTag ? `/api/tags/${editingTag.id}` : "/api/tags"
            const method = editingTag ? "PUT" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: tagName })
            })

            if (res.ok) {
                await fetchTags()
                setIsModalOpen(false)
            } else {
                alert("Gagal menyimpan tag. Mungkin nama tag sudah ada.")
            }
        } catch (error) {
            console.error("Error saving tag:", error)
            alert("Terjadi kesalahan saat menyimpan tag.")
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Apakah Anda yakin ingin menghapus tag "${name}"?`)) return

        try {
            const res = await fetch(`/api/tags/${id}`, { method: "DELETE" })
            if (res.ok) {
                setTags(tags.filter(t => t.id !== id))
            } else {
                alert("Gagal menghapus tag.")
            }
        } catch (error) {
            console.error("Error deleting tag:", error)
        }
    }

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        )
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
                            <FaArrowLeft size={18} className="text-gray-700" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">Kelola Tag</h1>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={fetchTags}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Refresh"
                        >
                            <FaSync size={16} className={loading ? "animate-spin" : ""} />
                        </button>
                        <button
                            onClick={() => handleOpenModal()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-2"
                        >
                            <FaPlus size={14} />
                            <span>Tambah Tag</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="p-6 max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700">Nama Tag</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700">Slug</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700 text-center">Artikel</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tags.map((tag) => (
                                <tr key={tag.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{tag.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">{tag.slug}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 text-center">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold">
                                            {tag._count?.articles || 0}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => handleOpenModal(tag)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <FaEdit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(tag.id, tag.name)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Hapus"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {tags.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                        <FaTags size={40} className="mx-auto mb-3 opacity-20" />
                                        <p>Belum ada tag yang ditambahkan</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <form onSubmit={handleSave}>
                                <div className="p-6 border-b flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {editingTag ? "Edit Tag" : "Tambah Tag Baru"}
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <FaTimes className="text-gray-400" />
                                    </button>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Nama Tag</label>
                                        <input
                                            autoFocus
                                            type="text"
                                            value={tagName}
                                            onChange={(e) => setTagName(e.target.value)}
                                            placeholder="Contoh: Teknologi, Kuliner..."
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            required
                                        />
                                        <p className="mt-2 text-xs text-gray-500">Slug akan digenerate otomatis dari nama tag.</p>
                                    </div>
                                </div>
                                <div className="p-6 bg-gray-50 flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-3 px-4 text-sm font-bold text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving || !tagName.trim()}
                                        className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 shadow-lg"
                                    >
                                        {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FaSave size={14} />}
                                        <span>Simpan Tag</span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
