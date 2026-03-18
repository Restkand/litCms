'use client'

import { motion, AnimatePresence, type Transition, type Variants } from 'framer-motion'
import { useState, useEffect, Children } from 'react'

type TextLoopProps = {
  children: React.ReactNode[]
  className?: string
  interval?: number
  transition?: Transition
  variants?: Variants
  onIndexChange?: (index: number) => void
}

export function TextLoop({
  children,
  className,
  interval = 2,
  transition = { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  variants,
  onIndexChange,
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const items = Children.toArray(children)

  useEffect(() => {
    const ms = interval * 1000
    const timer = setInterval(() => {
      setCurrentIndex((cur) => {
        const next = (cur + 1) % items.length
        onIndexChange?.(next)
        return next
      })
    }, ms)
    return () => clearInterval(timer)
  }, [items.length, interval, onIndexChange])

  const defaultVariants: Variants = {
    initial: { y: 24, opacity: 0, filter: 'blur(4px)' },
    animate: { y: 0,  opacity: 1, filter: 'blur(0px)' },
    exit:    { y: -24, opacity: 0, filter: 'blur(4px)' },
  }

  return (
    <span className={`relative inline-block overflow-hidden ${className ?? ''}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants ?? defaultVariants}
          className="inline-block"
        >
          {items[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
