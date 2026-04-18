"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    FaUser,
    FaPlus,
    FaEdit,
    FaTrash,
    FaSync,
    FaArrowLeft,
    FaTimes,
    FaSave,
    FaShieldAlt,
    FaEnvelope
} from "react-icons/fa"

import { canManageUsers, isSuperAdmin } from "@/lib/roles"

interface User {
    id: string
    name: string
    email: string
    role: string
    createdAt: string
    _count?: {
        articles: number
    }
}

export default function UsersPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "AUTHOR"
    })
    const [isSaving, setIsSaving] = useState(false)

    const fetchUsers = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/users")
            const data = await res.json()
            if (data.error) {
                alert(data.error)
                router.push("/admin")
                return
            }
            setUsers(data)
        } catch (error) {
            console.error("Failed to fetch users:", error)
        } finally {
            setLoading(false)
        }
    }, [router])

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login")
            return
        }
        if (status === "authenticated") {
            // Guard: only ADMIN and SUPER_ADMIN may access this page
            if (!canManageUsers(session?.user?.role ?? '')) {
                router.replace("/admin")
                return
            }
            fetchUsers()
        }
    }, [status, router, fetchUsers, session])

    const handleOpenModal = (user: User | null = null) => {
        setEditingUser(user)
        setFormData({
            name: user ? user.name : "",
            email: user ? user.email : "",
            password: "",
            role: user ? user.role : "AUTHOR"
        })
        setIsModalOpen(true)
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsSaving(true)
        try {
            const url = editingUser ? `/api/users/${editingUser.id}` : "/api/users"
            const method = editingUser ? "PUT" : "POST"

            // On update, only send password if it's not empty
            const payload: {
                name: string;
                email: string;
                password?: string;
                role: string;
            } = { ...formData }
            if (editingUser && !payload.password) {
                delete payload.password
            }

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                await fetchUsers()
                setIsModalOpen(false)
            } else {
                const data = await res.json()
                alert(data.error || "Gagal menyimpan user.")
            }
        } catch (error) {
            console.error("Error saving user:", error)
            alert("Terjadi kesalahan saat menyimpan user.")
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (id: string, name: string, role: string) => {
        if (isSuperAdmin(role)) {
            alert("Super Admin tidak dapat dihapus.")
            return
        }
        if (id === session?.user?.id) {
            alert("Anda tidak bisa menghapus akun Anda sendiri.")
            return
        }
        if (!confirm(`Apakah Anda yakin ingin menghapus user "${name}"?`)) return

        try {
            const res = await fetch(`/api/users/${id}`, { method: "DELETE" })
            if (res.ok) {
                setUsers(users.filter(u => u.id !== id))
            } else {
                const data = await res.json()
                alert(data.error || "Gagal menghapus user.")
            }
        } catch (error) {
            console.error("Error deleting user:", error)
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
                        <h1 className="text-2xl font-bold text-gray-900">Kelola User</h1>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={fetchUsers}
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
                            <span>Tambah User</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="p-6 max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700">Nama</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700">Email</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700">Role</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700 text-center">Artikel</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className="flex items-center space-x-2">
                                            <FaEnvelope className="text-gray-400" size={12} />
                                            <span>{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                            user.role === 'SUPER_ADMIN' ? 'bg-red-100 text-red-700' :
                                            user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                                            user.role === 'EDITOR' ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {user.role.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 text-center">
                                        <span className="text-xs font-bold">{user._count?.articles || 0}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => handleOpenModal(user)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <FaEdit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id, user.name, user.role)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30"
                                            disabled={user.id === session?.user?.id || isSuperAdmin(user.role)}
                                            title={isSuperAdmin(user.role) ? "Super Admin tidak dapat dihapus" : "Hapus"}
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
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
                                        {editingUser ? "Edit User" : "Tambah User Baru"}
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
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            {editingUser ? "Password (Kosongkan jika tidak diganti)" : "Password"}
                                        </label>
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                            required={!editingUser}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Role</label>
                                        <select
                                            value={formData.role}
                                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        >
                                            {session?.user?.role === 'SUPER_ADMIN' && (
                                                <option value="SUPER_ADMIN">SUPER ADMIN</option>
                                            )}
                                            <option value="ADMIN">ADMIN</option>
                                            <option value="EDITOR">EDITOR</option>
                                            <option value="AUTHOR">AUTHOR</option>
                                        </select>
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
                                        disabled={isSaving}
                                        className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 shadow-lg"
                                    >
                                        {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FaSave size={14} />}
                                        <span>Simpan User</span>
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
