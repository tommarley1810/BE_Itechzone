/**
 * pages/NotFound/index.jsx
 * Trang 404 — thiết kế branded
 */
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'
import Logo from '@/components/common/Logo'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-950 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-lg"
      >
        {/* Số 404 lớn với logo đè lên giữa */}
        <div className="relative mb-8">
          <h1
            className="text-[200px] font-black leading-none
                       bg-gradient-to-br from-gray-100 to-gray-200
                       dark:from-dark-800 dark:to-dark-900
                       bg-clip-text text-transparent select-none"
          >
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-dark-800 rounded-3xl px-6 py-4 shadow-xl border border-gray-100 dark:border-dark-700">
              <Logo size="md" />
            </div>
          </div>
        </div>

        {/* Thông báo lỗi */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Trang không tồn tại
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Xin lỗi, trang bạn đang tìm không tồn tại hoặc đã bị xóa.
          Hãy quay lại trang chủ để tiếp tục mua sắm.
        </p>

        {/* Các nút hành động */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3
                       bg-primary text-white rounded-2xl font-semibold text-sm
                       hover:bg-primary-700 transition-colors shadow-primary"
          >
            <Home size={17} />
            Về trang chủ
          </Link>
          <Link
            to="/tim-kiem"
            className="inline-flex items-center justify-center gap-2 px-6 py-3
                       bg-gray-100 dark:bg-dark-800 text-gray-800 dark:text-gray-200
                       rounded-2xl font-semibold text-sm
                       hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
          >
            <Search size={17} />
            Tìm kiếm
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
