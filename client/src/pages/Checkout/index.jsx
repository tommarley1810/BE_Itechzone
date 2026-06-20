/**
 * pages/Checkout/index.jsx
 * Trang thanh toán đơn hàng ITechZone
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, CreditCard, CheckCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'
import InputField from '@/components/forms/InputField'
import SelectField from '@/components/forms/SelectField'
import CartSummary from '@/components/cart/CartSummary'
import Breadcrumb from '@/components/common/Breadcrumb'
import useCartStore from '@/store/useCartStore'
import useAuthStore from '@/store/useAuthStore'
import { createOrder } from '@/services/orderService'
import { PAYMENT_METHODS } from '@/constants'

// Danh sách tỉnh thành phổ biến
const CITY_OPTIONS = [
  { value: 'hcm', label: 'TP. Hồ Chí Minh' },
  { value: 'hn', label: 'Hà Nội' },
  { value: 'dn', label: 'Đà Nẵng' },
  { value: 'ct', label: 'Cần Thơ' },
  { value: 'other', label: 'Tỉnh thành khác' },
]

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('cod')

  // Khởi tạo form với dữ liệu người dùng hiện tại (nếu đã đăng nhập)
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    city: '',
    district: '',
    ward: '',
    address: '',
    note: '',
  })

  // Cập nhật giá trị trường trong form
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Tính tổng giá trị đơn hàng
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  // Xử lý đặt hàng
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (items.length === 0) return
    if (!user) {
      toast.error('Vui lòng đăng nhập để đặt hàng')
      navigate('/dang-nhap')
      return
    }

    setLoading(true)
    try {
      // Map cart items sang format backend yêu cầu
      const orderItems = items.map(item => ({
        productId:    item.id,
        productName:  item.name,
        productImage: item.thumbnail || null,
        quantity:     item.qty,
        price:        item.price,
        variant:      item.variant || null,
      }))

      const shippingAddress = [form.address, form.district, form.city]
        .filter(Boolean).join(', ')

      await createOrder({
        shippingName:    form.name,
        shippingPhone:   form.phone,
        shippingAddress,
        paymentMethod:   selectedPayment,
        note:            form.note || undefined,
        items:           orderItems,
      })

      // Xoá giỏ hàng local
      clearCart()

      // Thông báo thành công + về trang chủ
      toast.success(
        '🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại ITechZone.',
        { duration: 5000, icon: '✅' }
      )
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header trang thanh toán */}
      <div className="bg-white dark:bg-dark-900 border-b border-gray-100 dark:border-dark-800 py-5">
        <div className="container-custom">
          <Breadcrumb
            items={[
              { label: 'Giỏ hàng', href: '/gio-hang' },
              { label: 'Thanh toán', href: '#' },
            ]}
          />
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-3">
            Thanh toán
          </h1>
        </div>
      </div>

      <div className="container-custom py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cột chính: thông tin giao hàng và phương thức thanh toán */}
            <div className="lg:col-span-2 space-y-6">
              {/* Phần thông tin giao hàng */}
              <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-100 dark:border-dark-700">
                <h2 className="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  Thông tin giao hàng
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Họ và tên"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    required
                  />
                  <InputField
                    label="Số điện thoại"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0901 234 567"
                    required
                  />
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="sm:col-span-2"
                  />
                  <SelectField
                    label="Tỉnh / Thành phố"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    options={CITY_OPTIONS}
                    required
                  />
                  <InputField
                    label="Quận / Huyện"
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    placeholder="Quận 1"
                    required
                  />
                  <InputField
                    label="Địa chỉ cụ thể"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Số nhà, tên đường"
                    className="sm:col-span-2"
                    required
                  />
                  <InputField
                    label="Ghi chú (tùy chọn)"
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    placeholder="Ghi chú cho đơn hàng..."
                    className="sm:col-span-2"
                  />
                </div>
              </div>

              {/* Phần phương thức thanh toán */}
              <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-100 dark:border-dark-700">
                <h2 className="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                  <CreditCard size={18} className="text-primary" />
                  Phương thức thanh toán
                </h2>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? 'border-primary bg-primary-50 dark:bg-primary-950'
                          : 'border-gray-200 dark:border-dark-600 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={() => setSelectedPayment(method.id)}
                        className="text-primary"
                      />
                      <span className="font-semibold text-sm text-gray-900 dark:text-white flex-1">
                        {method.name}
                      </span>
                      {method.description && (
                        <span className="text-xs text-gray-400 hidden sm:block">
                          {method.description}
                        </span>
                      )}
                      {selectedPayment === method.id && (
                        <CheckCircle size={18} className="text-primary" />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Nút đặt hàng */}
              <button
                type="submit"
                disabled={loading || items.length === 0}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-base hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-primary transition-all"
              >
                {loading ? 'Đang xử lý...' : 'Đặt hàng ngay'}
              </button>
            </div>

            {/* Cột phụ: tóm tắt giỏ hàng */}
            <div>
              <CartSummary items={items} showCheckoutBtn={false} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
