/**
 * pages/Cart/index.jsx
 * Trang giỏ hàng
 */
import { Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react'

import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import Breadcrumb from '@/components/common/Breadcrumb'
import EmptyState from '@/components/ui/EmptyState'
import useCartStore from '@/store/useCartStore'

export default function CartPage() {
  // Lấy dữ liệu giỏ hàng từ Zustand store
  const { items, clearCart } = useCartStore()

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-white dark:bg-dark-900 border-b border-gray-100 dark:border-dark-800 py-5">
        <div className="container-custom">
          <Breadcrumb items={[{ label: 'Giỏ hàng', href: '/gio-hang' }]} />
          <div className="flex items-center justify-between mt-3">
            <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
              Giỏ hàng ({items.length})
            </h1>
            {/* Nút xóa tất cả sản phẩm khỏi giỏ */}
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600
                           font-medium transition-colors"
              >
                <Trash2 size={15} /> Xóa tất cả
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Trạng thái giỏ hàng trống */}
        {items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Giỏ hàng trống"
            description="Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm."
            action={
              <Link
                to="/dien-thoai"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white
                           rounded-2xl font-semibold text-sm hover:bg-primary-700 transition-colors"
              >
                Mua sắm ngay
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Danh sách sản phẩm trong giỏ */}
            <div className="lg:col-span-2 space-y-3">
              <AnimatePresence>
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </AnimatePresence>

              {/* Link quay lại mua sắm */}
              <Link
                to="/dien-thoai"
                className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400
                           hover:text-primary transition-colors mt-2"
              >
                <ArrowLeft size={15} /> Tiếp tục mua sắm
              </Link>
            </div>

            {/* Tóm tắt đơn hàng */}
            <div>
              <CartSummary items={items} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
