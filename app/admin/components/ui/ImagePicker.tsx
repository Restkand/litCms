"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaImage, FaPlus, FaTimes, FaCheck, FaTrash } from "react-icons/fa"

interface Media {
  id: string
  url: string
  filename: string
  alt?: string
}

interface ImagePickerProps {
  value: string | null
  onChange: (id: string | null) => void
  label?: string
}

export default function ImagePicker({ value, onChange, label = "Gambar Unggulan" }: ImagePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mediaItems, setMediaItems] = useState<Media[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<Media | null>(null)

  // For "Adding by URL" simulation
  const [isAddingNewUrl, setIsAddingNewUrl] = useState(false)
  const [newUrl, setNewUrl] = useState("")
  const [newFilename, setNewFilename] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set())

  const markFailed = (id: string) => {
    setFailedImages(prev => new Set(prev).add(id))
    setLoadingImages(prev => { const s = new Set(prev); s.delete(id); return s })
  }
  const markLoaded = (id: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    setLoadingImages(prev => { const s = new Set(prev); s.delete(id); return s })
    // naturalWidth === 0 means the image loaded but has no content
    if ((e.currentTarget as HTMLImageElement).naturalWidth === 0) markFailed(id)
  }

  useEffect(() => {
    if (isOpen) {
      fetchMedia()
    }
  }, [isOpen])

  // Fetch current selected image by ID on mount or when value changes (needed for edit page)
  useEffect(() => {
    if (!value) {
      setSelectedImage(null)
      return
    }
    // If already loaded in mediaItems, use that
    const existing = mediaItems.find(m => m.id === value)
    if (existing) {
      setSelectedImage(existing)
      return
    }
    // Otherwise fetch from API (e.g. on edit page initial load)
    fetch(`/api/media/${value}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && !data.error) setSelectedImage(data)
      })
      .catch(() => {})
  }, [value, mediaItems])

  const fetchMedia = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/media")
      const data = await res.json()
      setMediaItems(data)
      // Pre-mark all items as loading so spinners show immediately
      setLoadingImages(new Set(data.map((m: Media) => m.id)))
      setFailedImages(new Set())
    } catch (error) {
      console.error("Failed to fetch media:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (image: Media) => {
    onChange(image.id)
    setSelectedImage(image)
    setIsOpen(false)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
    setSelectedImage(null)
  }

  const handleDeleteMedia = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (!confirm("Hapus metadata gambar ini? Tindakan ini tidak dapat dibatalkan.")) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" })
      if (res.ok) {
        setMediaItems(prev => prev.filter(m => m.id !== id))
        if (value === id) {
          onChange(null)
          setSelectedImage(null)
        }
      }
    } catch (error) {
      console.error("Failed to delete media:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleAddNewUrl = async () => {
    if (!newUrl || !newFilename) return

    setLoading(true)
    try {
      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: newFilename,
          url: newUrl,
          key: `manual-${Date.now()}`,
          mimeType: "image/jpeg",
          size: 0
        })
      })

      if (res.ok) {
        const newItem = await res.json()
        setMediaItems([newItem, ...mediaItems])
        setIsAddingNewUrl(false)
        setNewUrl("")
        setNewFilename("")
        handleSelect(newItem)
      }
    } catch (error) {
      console.error("Failed to add new media:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-gray-700 font-semibold">{label}</label>

      <div
        onClick={() => setIsOpen(true)}
        className={`relative aspect-video w-full rounded-xl border-2 border-dashed cursor-pointer overflow-hidden transition-all flex flex-col items-center justify-center ${selectedImage ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}`}
      >
        {selectedImage ? (
          <>
            {failedImages.has(selectedImage.id) ? (
              <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center gap-2">
                <FaImage size={32} className="text-gray-300" />
                <span className="text-xs text-gray-400 px-4 text-center truncate max-w-full">{selectedImage.filename}</span>
              </div>
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt || selectedImage.filename}
                  className="w-full h-full object-cover"
                  onError={() => markFailed(selectedImage.id)}
                  onLoad={(e) => markLoaded(selectedImage.id, e)}
                />
              </>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
              <p className="text-white font-medium flex items-center">
                <FaImage className="mr-2" /> Ganti Gambar
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
              title="Hapus"
            >
              <FaTimes size={12} />
            </button>
          </>
        ) : (
          <>
            <FaPlus size={24} className="text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Pilih atau Unggah Gambar</span>
          </>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-4xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b flex items-center justify-between bg-gray-50">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Media Library</h2>
                  <p className="text-sm text-gray-500">Pilih gambar untuk artikel Anda</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <FaTimes size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-6 flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNewUrl(!isAddingNewUrl)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center"
                  >
                    <FaPlus className="mr-2" /> {isAddingNewUrl ? "Batal" : "Tambah via URL"}
                  </button>
                </div>

                <AnimatePresence>
                  {isAddingNewUrl && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mb-6 overflow-hidden bg-blue-50 p-4 rounded-xl border border-blue-100"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-blue-700 uppercase mb-1">URL Gambar</label>
                          <input
                            type="text"
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-blue-700 uppercase mb-1">Nama File</label>
                          <input
                            type="text"
                            value={newFilename}
                            onChange={(e) => setNewFilename(e.target.value)}
                            placeholder="hero-image"
                            className="w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddNewUrl}
                        disabled={loading || !newUrl || !newFilename}
                        className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 disabled:opacity-50"
                      >
                        {loading ? "Menyimpan..." : "Simpan Metadata Gambar"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {loading && mediaItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4" />
                    <p>Memuat media...</p>
                  </div>
                ) : mediaItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-400 border-2 border-dashed rounded-xl">
                    <FaImage size={48} className="mb-4 opacity-20" />
                    <p>Belum ada media. Tambahkan melalui URL.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mediaItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className={`group relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-gray-100 ${value === item.id ? "border-blue-500 ring-2 ring-blue-200" : "border-transparent hover:border-blue-300"}`}
                      >
                        {failedImages.has(item.id) ? (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-2 bg-gray-100">
                            <FaImage size={24} className="text-gray-300" />
                            <span className="text-[9px] text-gray-400 text-center leading-tight break-all line-clamp-2">{item.filename}</span>
                          </div>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.url}
                            alt={item.filename}
                            className="w-full h-full object-cover"
                            onError={() => markFailed(item.id)}
                            onLoad={(e) => markLoaded(item.id, e)}
                          />
                        )}
                        {loadingImages.has(item.id) && !failedImages.has(item.id) && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                          {value === item.id && (
                            <div className="bg-blue-500 text-white p-1 rounded-full shadow-lg">
                              <FaCheck size={12} />
                            </div>
                          )}
                        </div>
                        <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-[10px] text-white truncate font-medium">{item.filename}</p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteMedia(e, item.id)}
                          disabled={deletingId === item.id}
                          className="absolute top-1.5 right-1.5 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all shadow-md disabled:opacity-50"
                          title="Hapus"
                        >
                          {deletingId === item.id
                            ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            : <FaTrash size={10} />}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-50 border-t flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 text-sm font-bold text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
