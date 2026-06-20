/**
 * Pagination.jsx — Phân trang
 */
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const getPages = () => {
    const pages = []
    const delta = 2
    const range = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) range.unshift('...')
    if (currentPage + delta < totalPages - 1) range.push('...')

    pages.push(1)
    range.forEach(p => pages.push(p))
    if (totalPages > 1) pages.push(totalPages)

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl border border-gray-200 dark:border-dark-600
                   text-gray-600 dark:text-gray-400
                   hover:bg-gray-100 dark:hover:bg-dark-700
                   disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all duration-200"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Pages */}
      {getPages().map((page, i) =>
        page === '...' ? (
          <span key={`dot-${i}`} className="px-2 text-gray-400">...</span>
        ) : (
          <motion.button
            key={page}
            whileTap={{ scale: 0.9 }}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-200 ${
              page === currentPage
                ? 'bg-primary text-white shadow-primary'
                : 'border border-gray-200 dark:border-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
            }`}
          >
            {page}
          </motion.button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl border border-gray-200 dark:border-dark-600
                   text-gray-600 dark:text-gray-400
                   hover:bg-gray-100 dark:hover:bg-dark-700
                   disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all duration-200"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
