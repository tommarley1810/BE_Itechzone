/**
 * layouts/MainLayout.jsx
 * Layout chính: Header + (slot nội dung) + Footer
 */
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import useThemeStore from '@/store/useThemeStore'

export default function MainLayout() {
  const location = useLocation()
  const { initTheme } = useThemeStore()

  // Khởi tạo theme khi app load
  useEffect(() => {
    initTheme()
  }, [])

  // Scroll lên đầu khi đổi route
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-dark-950">
      <Header />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
