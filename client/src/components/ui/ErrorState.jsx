/**
 * ErrorState.jsx — Trạng thái lỗi
 */
import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function ErrorState({ message = 'Đã xảy ra lỗi. Vui lòng thử lại.', onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-950/50 flex items-center justify-center mb-4">
        <AlertCircle size={36} className="text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Có lỗi xảy ra</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors"
        >
          <RefreshCw size={16} />
          Thử lại
        </button>
      )}
    </motion.div>
  )
}
