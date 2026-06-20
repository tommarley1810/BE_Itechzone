/**
 * CartDrawer.jsx — Drawer giỏ hàng trượt từ phải
 */
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, ArrowRight } from 'lucide-react'
import useCartStore from '@/store/useCartStore'
import CartItem from './CartItem'
import { formatPrice } from '@/utils/format'

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer } = useCartStore()

  // Tính tổng số lượng và giá trị giỏ hàng
  const totalItems = items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0)

  // Đóng drawer khi nhấn phím Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') closeDrawer() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [closeDrawer])

  // Ngăn body scroll khi drawer đang mở
  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isDrawerOpen])

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Overlay mờ nền */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-overlay"
            onClick={closeDrawer}
          />

          {/* Panel drawer chính */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md
                       bg-white dark:bg-dark-900
                       z-modal flex flex-col shadow-2xl"
          >
            {/* Header giỏ hàng */}
            <div className="flex items-center justify-between px-5 py-4
                            border-b border-gray-100 dark:border-dark-700">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Giỏ hàng</h2>
                {totalItems > 0 && (
                  <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Danh sách sản phẩm trong giỏ */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 ? (
                // Trạng thái giỏ hàng trống
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-dark-800
                                  flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-gray-400" />
                  </div>
                  <p className="font-semibold text-gray-700 dark:text-gray-300">Giỏ hàng trống</p>
                  <p className="text-sm text-gray-400 mt-1">Thêm sản phẩm vào giỏ ngay!</p>
                  <button
                    onClick={closeDrawer}
                    className="mt-5 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Mua sắm ngay
                  </button>
                </div>
              ) : (
                // Render từng CartItem với animation
                <AnimatePresence>
                  {items.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer — tổng tiền & nút thanh toán */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 dark:border-dark-700 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tổng cộng:</span>
                  <span className="text-xl font-bold text-primary">{formatPrice(totalPrice)}</span>
                </div>

                <Link
                  to="/gio-hang"
                  onClick={closeDrawer}
                  className="flex items-center justify-center gap-2 w-full
                             py-3.5 bg-primary text-white rounded-2xl
                             text-base font-semibold hover:bg-primary-700
                             transition-colors shadow-primary"
                >
                  Xem giỏ hàng
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/thanh-toan"
                  onClick={closeDrawer}
                  className="flex items-center justify-center gap-2 w-full
                             py-3 border-2 border-primary text-primary rounded-2xl
                             text-sm font-semibold hover:bg-primary hover:text-white
                             transition-all"
                >
                  Thanh toán ngay
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
