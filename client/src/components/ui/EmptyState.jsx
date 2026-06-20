/**
 * EmptyState.jsx — Trạng thái rỗng
 */
import { motion } from 'framer-motion'
import { PackageSearch } from 'lucide-react'

export default function EmptyState({
  icon: Icon = PackageSearch,
  title = 'Không có sản phẩm',
  description = 'Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác.',
  action,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-dark-700 flex items-center justify-center mb-4">
        <Icon size={36} className="text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-6">{description}</p>
      {action && action}
    </motion.div>
  )
}
