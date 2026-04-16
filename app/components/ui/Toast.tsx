"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa"

type ToastType = "success" | "error" | "warning" | "info"

interface ToastItem {
  id: string
  type: ToastType
  title: string
  message?: string
}

const icons = {
  success: <FaCheckCircle className="text-green-500" size={20} />,
  error: <FaTimesCircle className="text-red-500" size={20} />,
  warning: <FaExclamationCircle className="text-yellow-500" size={20} />,
  info: <FaInfoCircle className="text-blue-500" size={20} />,
}

const styles = {
  success: "border-l-4 border-green-500 bg-white",
  error: "border-l-4 border-red-500 bg-white",
  warning: "border-l-4 border-yellow-500 bg-white",
  info: "border-l-4 border-blue-500 bg-white",
}

interface ToastContainerProps {
  toasts: ToastItem[]
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl shadow-xl min-w-[280px] max-w-sm ${styles[toast.type]}`}
          >
            <span className="mt-0.5 shrink-0">{icons[toast.type]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-gray-500 mt-0.5">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => onRemove(toast.id)}
              className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors mt-0.5"
            >
              <FaTimes size={12} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export function useToast(duration = 4000) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (type: ToastType, title: string, message?: string) => {
      const id = `${Date.now()}-${Math.random()}`
      setToasts((prev) => [...prev, { id, type, title, message }])
      setTimeout(() => remove(id), duration)
    },
    [duration, remove]
  )

  return { toast, toasts, remove }
}
