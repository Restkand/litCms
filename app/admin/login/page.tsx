"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { FaEye, FaEyeSlash, FaUser, FaLock, FaShieldAlt, FaTimes, FaExclamationTriangle } from "react-icons/fa"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setShowErrorPopup(false)

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        setLoading(false)

        if (result?.error) {
            const errorMessage = "Email atau password yang Anda masukkan salah"
            setError(errorMessage)
            setShowErrorPopup(true)

            setTimeout(() => {
                setShowErrorPopup(false)
                setError("")
            }, 5000)
        } else {
            router.push("/admin")
            router.refresh()
        }
    }

    const handleInputChange = (field: "email" | "password", value: string) => {
        if (field === "email") setEmail(value)
        else setPassword(value)

        if (error) {
            setError("")
            setShowErrorPopup(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-blue-100">
                        <FaShieldAlt size={32} className="text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 text-gray-900">
                        Admin Panel
                    </h1>
                    <p className="text-sm text-gray-600">
                        CMS Demo Content Management System
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-2xl shadow-xl p-8 bg-white border border-gray-100"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 rounded-lg border-l-4 bg-red-50 border-red-500"
                            >
                                <div className="flex items-center space-x-2 text-red-700">
                                    <FaExclamationTriangle size={16} />
                                    <span className="text-sm font-medium">{error}</span>
                                </div>
                            </motion.div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-900">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser size={16} className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    placeholder="Masukkan email"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-900">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock size={16} className="text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                    placeholder="Masukkan password"
                                    required
                                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash size={16} className="text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <FaEye size={16} className="text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email || !password}
                            className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-blue-500/50"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Memverifikasi...
                                </div>
                            ) : (
                                "Masuk ke Admin Panel"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                            <p className="text-xs font-semibold text-blue-700 mb-2">Demo Credentials</p>
                            <div className="space-y-1 text-xs text-blue-800 font-mono">
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-600">Email</span>
                                    <span className="font-semibold">admin@cms.com</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-600">Password</span>
                                    <span className="font-semibold">admin123</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setEmail("admin@cms.com")
                                    setPassword("admin123")
                                    setError("")
                                    setShowErrorPopup(false)
                                }}
                                className="mt-3 w-full py-1.5 px-3 rounded-md text-xs font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                            >
                                Gunakan Akun Demo
                            </button>
                        </div>
                        <p className="text-center text-xs text-gray-500">
                            Akses terbatas hanya untuk administrator
                        </p>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {showErrorPopup && error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="fixed top-6 right-6 z-50 max-w-sm w-full"
                        >
                            <div className="rounded-xl shadow-2xl border-l-4 border-red-500 p-4 bg-white">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                        <FaExclamationTriangle size={16} className="text-red-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-semibold mb-1 text-gray-900">
                                            Login Gagal
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {error}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowErrorPopup(false)
                                            setError("")
                                        }}
                                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-100 text-gray-400"
                                    >
                                        <FaTimes size={12} />
                                    </button>
                                </div>

                                <motion.div
                                    initial={{ width: "100%" }}
                                    animate={{ width: "0%" }}
                                    transition={{ duration: 5, ease: "linear" }}
                                    className="mt-3 h-1 rounded-full bg-red-200"
                                    onAnimationComplete={() => {
                                        setShowErrorPopup(false)
                                        setError("")
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
