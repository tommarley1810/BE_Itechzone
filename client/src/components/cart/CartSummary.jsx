/**
 * CartSummary.jsx — Tóm tắt đơn hàng
 */
import { Link } from 'react-router-dom'
import { ArrowRight, Tag } from 'lucide-react'
import { formatPrice } from '@/utils/format'

export default function CartSummary({ items = [], showCheckoutBtn = true }) {
  // Tính tạm tính, phí ship và tổng cộng
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  // Miễn phí ship cho đơn trên 5 triệu
  const shipping = subtotal > 5_000_000 ? 0 : 30_000
  const total = subtotal + shipping

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-5
                    border border-gray-100 dark:border-dark-700 space-y-4">
      <h3 className="font-bold text-gray-900 dark:text-white text-base">Tóm tắt đơn hàng</h3>

      {/* Chi tiết giá */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Tạm tính ({items.length} sản phẩm)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Phí vận chuyển</span>
          <span className={shipping === 0 ? 'text-green-500 font-semibold' : ''}>
            {shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}
          </span>
        </div>
        {/* Thông báo miễn phí vận chuyển */}
        {shipping === 0 && (
          <p className="text-xs text-green-500 bg-green-50 dark:bg-green-950/30 px-3 py-2 rounded-xl">
            ✓ Bạn được miễn phí vận chuyển!
          </p>
        )}
      </div>

      {/* Tổng cộng */}
      <div className="border-t border-gray-100 dark:border-dark-700 pt-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900 dark:text-white">Tổng cộng</span>
          <span className="text-xl font-black text-primary">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Nút thanh toán */}
      {showCheckoutBtn && (
        <Link
          to="/thanh-toan"
          className="flex items-center justify-center gap-2 w-full
                     py-3.5 bg-primary text-white rounded-2xl
                     font-semibold hover:bg-primary-700
                     transition-colors shadow-primary text-sm"
        >
          Thanh toán ngay
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  )
}
