"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { FaSave, FaTimes, FaArrowLeft, FaToggleOn, FaToggleOff, FaPen } from "react-icons/fa"

export default function NewArticlePage() {
    const { status } = useSession()
    const router = useRouter()
    const [saving, setSaving] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [published, setPublished] = useState(false)
    const [errors, setErrors] = useState<{ title?: string; content?: string }>({})

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login")
        }
    }, [status, router])

    const validateForm = () => {
        const newErrors: { title?: string; content?: string } = {}

        if (!title.trim()) {
            newErrors.title = "Judul artikel wajib diisi"
        }

        if (!content.trim()) {
            newErrors.content = "Konten artikel wajib diisi"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setSaving(true)

        const response = await fetch("/api/articles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content, published })
        })

        setSaving(false)

        if (response.ok) {
            alert("Artikel berhasil dibuat!")
            router.push("/admin/articles")
        } else {
            alert("Gagal membuat artikel")
        }
    }

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Header */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-md border-b border-gray-200 shadow-sm"
            >
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => router.push("/admin/articles")}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                title="Kembali"
                            >
                                <FaArrowLeft size={20} className="text-gray-700" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center space-x-2">
                                    <FaPen size={24} />
                                    <span>Buat Artikel Baru</span>
                                </h1>
                                <p className="text-sm text-gray-600">Tulis dan publikasikan artikel Anda</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title Input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            <label className="block mb-3">
                                <span className="text-gray-700 font-semibold text-lg flex items-center">
                                    Judul Artikel
                                    <span className="text-red-500 ml-1">*</span>
                                </span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                    if (errors.title) setErrors({ ...errors, title: undefined })
                                }}
                                placeholder="Masukkan judul artikel yang menarik..."
                                className={`w-full px-5 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 transition-all ${errors.title
                                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                                    }`}
                            />
                            {errors.title && (
                                <p className="mt-2 text-red-600 text-sm">{errors.title}</p>
                            )}
                        </motion.div>

                        {/* Content Input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            <label className="block mb-3">
                                <span className="text-gray-700 font-semibold text-lg flex items-center">
                                    Konten Artikel
                                    <span className="text-red-500 ml-1">*</span>
                                </span>
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value)
                                    if (errors.content) setErrors({ ...errors, content: undefined })
                                }}
                                rows={16}
                                placeholder="Tulis konten artikel Anda di sini... Ceritakan sesuatu yang menarik!"
                                className={`w-full px-5 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 transition-all resize-none ${errors.content
                                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                                    }`}
                            />
                            {errors.content && (
                                <p className="mt-2 text-red-600 text-sm">{errors.content}</p>
                            )}
                            <p className="mt-3 text-sm text-gray-500">
                                {content.length} karakter
                            </p>
                        </motion.div>

                        {/* Published Toggle */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-gray-700 font-semibold text-lg mb-1">Status Publikasi</h3>
                                    <p className="text-sm text-gray-500">
                                        {published ? "Artikel akan langsung terlihat oleh publik" : "Artikel disimpan sebagai draft"}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setPublished(!published)}
                                    className={`relative inline-flex items-center h-12 w-24 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 ${published
                                            ? "bg-green-500 focus:ring-green-200"
                                            : "bg-gray-300 focus:ring-gray-200"
                                        }`}
                                >
                                    <span
                                        className={`inline-block w-10 h-10 transform transition-transform duration-300 bg-white rounded-full shadow-lg ${published ? "translate-x-12" : "translate-x-1"
                                            }`}
                                    >
                                        {published ? (
                                            <FaToggleOn className="w-full h-full p-2 text-green-500" />
                                        ) : (
                                            <FaToggleOff className="w-full h-full p-2 text-gray-400" />
                                        )}
                                    </span>
                                </button>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center space-x-4 pt-4"
                        >
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                            >
                                {saving ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Menyimpan...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaSave size={20} />
                                        <span>Simpan Artikel</span>
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push("/admin/articles")}
                                className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-gray-200 flex items-center space-x-2"
                            >
                                <FaTimes size={20} />
                                <span>Batal</span>
                            </button>
                        </motion.div>
                    </form>
                </motion.div>
            </main>
        </div>
    )
}
