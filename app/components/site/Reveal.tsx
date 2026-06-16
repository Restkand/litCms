"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

/** Fade-up saat masuk viewport — pengganti efek [data-reveal] di prototipe. */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "section"
}) {
  const MotionTag = as === "section" ? motion.section : motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </MotionTag>
  )
}
