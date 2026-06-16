"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { FaCog, FaPlus, FaEdit, FaTrash, FaArrowLeft, FaTimes, FaCheck } from "react-icons/fa"
import { useToast, ToastContainer } from "@/app/components/ui/Toast"

interface Setting {
  id: string
  key: string
  value: string
  description: string | null
  updatedAt: string
}

// Saran key umum (prefill modal tambah)
const SUGGESTED_KEYS = [
  "site_title",
  "site_description",
  "contact_email",
  "whatsapp_number",
  "address",
  "social_github",
  "social_linkedin",
  "social_instagram",
]

export default function SettingsPage() {
  const { status } = useSession()
  const router = useRouter()
  const { toast, toasts, remove } = useToast()

  const [settings, setSettings] = useState<Setting[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Setting | null>(null)
  const [formKey, setFormKey] = useState("")
  const [formValue, setFormValue] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  const fetchSettings = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/settings")
      const data = await res.json()
      setSettings(Array.isArray(data) ? data : [])
    } catch {
      toast("error", "Gagal memuat pengaturan")
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    if (status === "authenticated") fetchSettings()
  }, [status, fetchSettings])

  const openCreate = (prefillKey = "") => {
    setEditTarget(null)
    setFormKey(prefillKey)
    setFormValue("")
    setFormDescription("")
    setFormError("")
    setIsModalOpen(true)
  }

  const openEdit = (s: Setting) => {
    setEditTarget(s)
    setFormKey(s.key)
    setFormValue(s.value)
    setFormDescription(s.description ?? "")
    setFormError("")
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditTarget(null)
    setFormKey("")
    setFormValue("")
    setFormDescription("")
    setFormError("")
  }

  const handleSave = async () => {
    if (!editTarget && !formKey.trim()) {
      setFormError("Key wajib diisi")
      return
    }
    if (!formValue.trim()) {
      setFormError("Value wajib diisi")
      return
    }
    setSaving(true)
    setFormError("")

    const isEdit = !!editTarget
    const url = isEdit ? `/api/settings/${editTarget.id}` : "/api/settings"
    const method = isEdit ? "PUT" : "POST"
    const body = isEdit
      ? { value: formValue.trim(), description: formDescription.trim() }
      : { key: formKey.trim(), value: formValue.trim(), description: formDescription.trim() }

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) {
        setFormError(data.error ?? "Terjadi kesalahan")
        return
      }
      toast("success", isEdit ? "Pengaturan diperbarui" : "Pengaturan dibuat")
      closeModal()
      fetchSettings()
    } catch {
      setFormError("Terjadi kesalahan, coba lagi")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (s: Setting) => {
    if (!confirm(`Hapus pengaturan "${s.key}"?`)) return
    setDeletingId(s.id)
    try {
      const res = await fetch(`/api/settings/${s.id}`, { method: "DELETE" })
      if (res.ok) {
        toast("success", "Pengaturan dihapus")
        setSettings(prev => prev.filter(x => x.id !== s.id))
      } else {
        toast("error", "Gagal menghapus pengaturan")
      }
    } catch {
      toast("error", "Gagal menghapus pengaturan")
    } finally {
      setDeletingId(null)
    }
  }

  const existingKeys = new Set(settings.map(s => s.key))
  const availableSuggestions = SUGGESTED_KEYS.filter(k => !existingKeys.has(k))

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat pengaturan...</p>
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
                <FaCog />
                Pengaturan
              </h1>
              <p className="text-sm text-gray-500">{settings.length} pengaturan tersimpan</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => openCreate()}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold shadow hover:shadow-lg transition-all"
          >
            <FaPlus size={12} />
            Tambah Pengaturan
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Quick-add suggestions */}
        {availableSuggestions.length > 0 && (
          <div className="mb-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-sm font-semibold text-gray-700 mb-3">Tambah cepat (key umum)</p>
            <div className="flex flex-wrap gap-2">
              {availableSuggestions.map(k => (
                <button
                  key={k}
                  type="button"
                  onClick={() => openCreate(k)}
                  className="px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                >
                  + {k}
                </button>
              ))}
            </div>
          </div>
        )}

        {settings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-lg p-16 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-4">
              <FaCog size={28} className="text-purple-400" />
            </div>
            <p className="text-gray-600 font-medium mb-2">Belum ada pengaturan</p>
            <p className="text-gray-400 text-sm mb-6">Simpan pasangan key/value untuk konfigurasi situs Anda</p>
            <button
              type="button"
              onClick={() => openCreate()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold shadow hover:shadow-lg transition-all"
            >
              <FaPlus size={12} /> Buat Pengaturan Pertama
            </button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {settings.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                    <FaCog size={16} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-0.5 rounded-full">{s.key}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mt-1 truncate">{s.value}</p>
                    {s.description && (
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{s.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => openEdit(s)}
                    className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Edit"
                  >
                    <FaEdit size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(s)}
                    disabled={deletingId === s.id}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                    title="Hapus"
                  >
                    {deletingId === s.id
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
                  {editTarget ? "Edit Pengaturan" : "Tambah Pengaturan"}
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
                    Key <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formKey}
                    onChange={(e) => { setFormKey(e.target.value); setFormError("") }}
                    placeholder="contoh: site_title"
                    disabled={!!editTarget}
                    className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all text-sm font-mono ${
                      editTarget
                        ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
                        : formError && !formKey.trim()
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                    autoFocus={!editTarget}
                  />
                  {editTarget && <p className="mt-1 text-gray-400 text-xs">Key tidak dapat diubah setelah dibuat.</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Value <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formValue}
                    onChange={(e) => { setFormValue(e.target.value); setFormError("") }}
                    rows={3}
                    placeholder="Nilai pengaturan..."
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm resize-none"
                    autoFocus={!!editTarget}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Deskripsi <span className="text-gray-400 font-normal">(opsional)</span>
                  </label>
                  <input
                    type="text"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Keterangan singkat pengaturan ini..."
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm"
                  />
                </div>

                {formError && <p className="text-red-600 text-xs">{formError}</p>}
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
                    : <><FaCheck size={12} /> {editTarget ? "Simpan Perubahan" : "Buat Pengaturan"}</>
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
