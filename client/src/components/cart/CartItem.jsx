/**
 * CartItem.jsx — Item trong giỏ hàng
 */
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '@/store/useCartStore'
import { formatPrice } from '@/utils/format'

export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCartStore()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-4 p-4 bg-white dark:bg-dark-800
                 rounded-2xl border border-gray-100 dark:border-dark-700"
    >
      {/* Thumbnail sản phẩm */}
      <Link to={`/san-pham/${item.slug}`}>
        <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 dark:bg-dark-700">
          <img src={item.thumbnail} alt={item.name}
               className="w-full h-full object-contain p-2" />
        </div>
      </Link>

      {/* Thông tin sản phẩm */}
      <div className="flex-1 min-w-0">
        <Link to={`/san-pham/${item.slug}`}>
          <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2
                         hover:text-primary transition-colors">
            {item.name}
          </p>
        </Link>
        <p className="text-xs text-gray-400 mt-0.5">{item.brand}</p>

        <div className="flex items-center justify-between mt-3">
          {/* Điều chỉnh số lượng */}
          <div className="flex items-center border border-gray-200 dark:border-dark-600 rounded-xl overflow-hidden">
            <button
              onClick={() => updateQty(item.id, item.qty - 1)}
              className="w-8 h-8 flex items-center justify-center
                         text-gray-600 dark:text-gray-400
                         hover:bg-gray-100 dark:hover:bg-dark-700
                         transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-10 text-center text-sm font-semibold
                            text-gray-900 dark:text-white">
              {item.qty}
            </span>
            <button
              onClick={() => updateQty(item.id, item.qty + 1)}
              disabled={item.qty >= item.stock}
              className="w-8 h-8 flex items-center justify-center
                         text-gray-600 dark:text-gray-400
                         hover:bg-gray-100 dark:hover:bg-dark-700
                         disabled:opacity-40 disabled:cursor-not-allowed
                         transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Giá tiền */}
          <span className="text-base font-bold text-primary">
            {formatPrice(item.price * item.qty)}
          </span>
        </div>
      </div>

      {/* Nút xóa sản phẩm */}
      <button
        onClick={() => removeItem(item.id)}
        className="self-start p-1.5 text-gray-400 hover:text-red-500
                   hover:bg-red-50 dark:hover:bg-red-950/30
                   rounded-lg transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  )
}
