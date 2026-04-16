"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { FaLayerGroup, FaPlus, FaEdit, FaTrash, FaArrowLeft, FaTimes, FaCheck } from "react-icons/fa"
import { useToast, ToastContainer } from "@/app/components/ui/Toast"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  createdAt: string
  _count: { articles: number }
}

export default function CategoriesPage() {
  const { status } = useSession()
  const router = useRouter()
  const { toast, toasts, remove } = useToast()

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Category | null>(null)
  const [formName, setFormName] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/categories")
      const data = await res.json()
      setCategories(data)
    } catch {
      toast("error", "Gagal memuat kategori")
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    if (status === "authenticated") fetchCategories()
  }, [status, fetchCategories])

  const openCreate = () => {
    setEditTarget(null)
    setFormName("")
    setFormDescription("")
    setFormError("")
    setIsModalOpen(true)
  }

  const openEdit = (cat: Category) => {
    setEditTarget(cat)
    setFormName(cat.name)
    setFormDescription(cat.description ?? "")
    setFormError("")
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditTarget(null)
    setFormName("")
    setFormDescription("")
    setFormError("")
  }

  const handleSave = async () => {
    if (!formName.trim()) {
      setFormError("Nama kategori wajib diisi")
      return
    }
    setSaving(true)
    setFormError("")

    const isEdit = !!editTarget
    const url = isEdit ? `/api/categories/${editTarget.id}` : "/api/categories"
    const method = isEdit ? "PUT" : "POST"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName.trim(), description: formDescription.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setFormError(data.error ?? "Terjadi kesalahan")
        return
      }
      toast("success", isEdit ? "Kategori diperbarui" : "Kategori dibuat")
      closeModal()
      fetchCategories()
    } catch {
      setFormError("Terjadi kesalahan, coba lagi")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (cat: Category) => {
    if (cat._count.articles > 0) {
      toast("error", "Tidak bisa dihapus", `Kategori ini masih digunakan oleh ${cat._count.articles} artikel.`)
      return
    }
    if (!confirm(`Hapus kategori "${cat.name}"?`)) return
    setDeletingId(cat.id)
    try {
      const res = await fetch(`/api/categories/${cat.id}`, { method: "DELETE" })
      if (res.ok) {
        toast("success", "Kategori dihapus")
        setCategories(prev => prev.filter(c => c.id !== cat.id))
      } else {
        toast("error", "Gagal menghapus kategori")
      }
    } catch {
      toast("error", "Gagal menghapus kategori")
    } finally {
      setDeletingId(null)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat kategori...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <ToastContainer toasts={toasts} onRemove={remove} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Kembali"
            >
              <FaArrowLeft size={18} className="text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                <FaLayerGroup />
                Manajemen Kategori
              </h1>
              <p className="text-sm text-gray-500">{categories.length} kategori tersedia</p>
            </div>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold shadow hover:shadow-lg transition-all"
          >
            <FaPlus size={12} />
            Tambah Kategori
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {categories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-lg p-16 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-4">
              <FaLayerGroup size={28} className="text-purple-400" />
            </div>
            <p className="text-gray-600 font-medium mb-2">Belum ada kategori</p>
            <p className="text-gray-400 text-sm mb-6">Buat kategori untuk mengelompokkan artikel Anda</p>
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold shadow hover:shadow-lg transition-all"
            >
              <FaPlus size={12} /> Buat Kategori Pertama
            </button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                    <FaLayerGroup size={16} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900">{cat.name}</span>
                      <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-0.5 rounded-full">
                        /{cat.slug}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        cat._count.articles > 0
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {cat._count.articles} artikel
                      </span>
                    </div>
                    {cat.description && (
                      <p className="text-sm text-gray-500 mt-0.5 truncate">{cat.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => openEdit(cat)}
                    className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Edit"
                  >
                    <FaEdit size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(cat)}
                    disabled={deletingId === cat.id}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                    title={cat._count.articles > 0 ? "Tidak bisa dihapus — masih ada artikel" : "Hapus"}
                  >
                    {deletingId === cat.id
                      ? <div className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      : <FaTrash size={14} />
                    }
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editTarget ? "Edit Kategori" : "Tambah Kategori"}
                </h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaTimes size={16} className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Nama Kategori <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => { setFormName(e.target.value); setFormError("") }}
                    placeholder="Contoh: Teknologi"
                    className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all text-sm ${
                      formError
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  />
                  {formError && <p className="mt-1 text-red-600 text-xs">{formError}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Deskripsi <span className="text-gray-400 font-normal">(opsional)</span>
                  </label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    rows={3}
                    placeholder="Deskripsi singkat kategori ini..."
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold shadow hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
                >
                  {saving
                    ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <><FaCheck size={12} /> {editTarget ? "Simpan Perubahan" : "Buat Kategori"}</>
                  }
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
