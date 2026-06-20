/**
 * hooks/useAddToCart.js
 * Hook bọc addItem + kiểm tra đăng nhập trước khi thêm vào giỏ
 * Dùng thống nhất tại mọi nơi cần thêm sản phẩm vào giỏ hàng
 */
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import useCartStore from '@/store/useCartStore'
import useAuthStore from '@/store/useAuthStore'

export function useAddToCart() {
  const navigate = useNavigate()
  const { addItem, openDrawer } = useCartStore()
  const { token } = useAuthStore()

  /**
   * Thêm sản phẩm vào giỏ — yêu cầu đăng nhập
   * @param {Object} product - Sản phẩm cần thêm
   * @param {number} qty     - Số lượng (mặc định 1)
   * @param {boolean} openCart - Có mở drawer sau khi thêm không (mặc định true)
   */
  const addToCart = (product, qty = 1, openCart = true) => {
    if (!token) {
      toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng', {
        icon: '🔒',
        duration: 3000,
      })
      navigate('/dang-nhap')
      return false
    }

    addItem(product, qty)
    if (openCart) openDrawer()
    return true
  }

  return { addToCart }
}
