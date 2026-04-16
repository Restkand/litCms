"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { FaSave, FaTimes, FaArrowLeft, FaToggleOn, FaToggleOff, FaLayerGroup, FaTags, FaSearchPlus } from "react-icons/fa"

interface Category {
  id: string
  name: string
}

interface Tag {
  id: string
  name: string
}

export default function EditArticlePage() {
  const { status } = useSession()
  const router = useRouter()
  const params = useParams()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [published, setPublished] = useState(false)
  const [categoryId, setCategoryId] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")

  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({})

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
      return
    }

    if (status === "authenticated" && params.id) {
      const fetchData = async () => {
        setLoading(true)
        try {
          const [articleRes, catsRes, tagsRes] = await Promise.all([
            fetch(`/api/articles/${params.id}`),
            fetch("/api/categories"),
            fetch("/api/tags")
          ])

          const article = await articleRes.json()
          const catsData = await catsRes.json()
          const tagsData = await tagsRes.json()

          if (article.error) {
            alert("Gagal memuat artikel")
            router.push("/admin/articles")
            return
          }

          setTitle(article.title || "")
          setContent(article.content || "")
          setExcerpt(article.excerpt || "")
          setPublished(article.published || false)
          setCategoryId(article.categoryId || "")
          setSelectedTags(article.tags?.map((t: any) => t.id) || [])
          setMetaTitle(article.metaTitle || "")
          setMetaDescription(article.metaDescription || "")

          setCategories(catsData)
          setTags(tagsData)
        } catch (error) {
          console.error("Error fetching data:", error)
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    }
  }, [status, params.id, router])

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

    const response = await fetch(`/api/articles/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        excerpt,
        published,
        categoryId: categoryId || null,
        tags: selectedTags,
        metaTitle,
        metaDescription
      })
    })

    setSaving(false)

    if (response.ok) {
      alert("Artikel berhasil diupdate!")
      router.push("/admin/articles")
    } else {
      alert("Gagal mengupdate artikel")
    }
  }

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
        prev.includes(tagId)
            ? prev.filter(id => id !== tagId)
            : [...prev, tagId]
    )
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Memuat artikel...</p>
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Edit Artikel
                </h1>
                <p className="text-sm text-gray-600">Perbarui artikel Anda</p>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title Input */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <label className="block mb-2">
                    <span className="text-gray-700 font-semibold flex items-center">
                      Judul Artikel <span className="text-red-500 ml-1">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value)
                      if (errors.title) setErrors({ ...errors, title: undefined })
                    }}
                    placeholder="Masukkan judul artikel..."
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all ${errors.title ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
                  />
                  {errors.title && <p className="mt-1 text-red-600 text-sm">{errors.title}</p>}
                </div>

                {/* Excerpt Input */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <label className="block mb-2 text-gray-700 font-semibold">Ringkasan (Excerpt)</label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                    placeholder="Tulis ringkasan singkat artikel..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
                  />
                </div>

                {/* Content Input */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <label className="block mb-2">
                    <span className="text-gray-700 font-semibold flex items-center">
                      Konten Artikel <span className="text-red-500 ml-1">*</span>
                    </span>
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value)
                      if (errors.content) setErrors({ ...errors, content: undefined })
                    }}
                    rows={12}
                    placeholder="Tulis isi artikel lengkap di sini..."
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all ${errors.content ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
                  />
                  {errors.content && <p className="mt-1 text-red-600 text-sm">{errors.content}</p>}
                </div>

                {/* SEO Settings */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-gray-700 font-bold text-lg mb-4 flex items-center">
                    <FaSearchPlus className="mr-2 text-blue-500" />
                    SEO Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-600">Meta Title</label>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder="Title for search engines..."
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-600">Meta Description</label>
                      <textarea
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        rows={2}
                        placeholder="Description for search results..."
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Settings */}
              <div className="space-y-6">
                {/* Status Toggle */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-gray-700 font-bold mb-4">Status Publikasi</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{published ? "Published" : "Draft"}</span>
                    <button
                      type="button"
                      onClick={() => setPublished(!published)}
                      className={`relative inline-flex items-center h-8 w-16 rounded-full transition-all duration-300 ${published ? "bg-green-500" : "bg-gray-300"}`}
                    >
                      <span className={`inline-block w-6 h-6 transform transition-transform duration-300 bg-white rounded-full shadow ${published ? "translate-x-9" : "translate-x-1"}`}>
                        {published ? <FaToggleOn className="w-full h-full p-1 text-green-500" /> : <FaToggleOff className="w-full h-full p-1 text-gray-400" />}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Category Selection */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-gray-700 font-bold mb-4 flex items-center">
                    <FaLayerGroup className="mr-2 text-purple-500" />
                    Kategori
                  </h3>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Tanpa Kategori</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Tag Selection */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-gray-700 font-bold mb-4 flex items-center">
                    <FaTags className="mr-2 text-orange-500" />
                    Tag
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedTags.includes(tag.id) ? "bg-blue-600 text-white shadow-md scale-105" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><FaSave /> <span>Update Artikel</span></>}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/admin/articles")}
                    className="w-full py-3 bg-white text-gray-700 rounded-xl font-bold shadow-md hover:shadow-lg transform hover:scale-105 transition-all border border-gray-200 flex items-center justify-center space-x-2"
                  >
                    <FaTimes /> <span>Batal</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
