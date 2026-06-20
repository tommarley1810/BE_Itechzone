/**
 * pages/Admin/Products/ProductForm.jsx — Form thêm/sửa sản phẩm
 */
import { useState } from 'react'
import { X, Package } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { createProduct, updateProduct } from '@/services/adminService'

const CATEGORIES = [
  { value: 'dien-thoai',    label: 'Điện thoại' },
  { value: 'may-tinh-bang', label: 'Máy tính bảng' },
  { value: 'phu-kien',      label: 'Phụ kiện' },
]

const BRANDS_MAP = {
  'dien-thoai':    ['apple', 'samsung', 'xiaomi', 'oppo', 'vivo'],
  'may-tinh-bang': ['apple', 'samsung', 'xiaomi'],
  'phu-kien':      ['apple', 'samsung', 'anker', 'baseus'],
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-slate-300 text-xs font-medium mb-1.5 block">{label}</label>
      {children}
    </div>
  )
}

const INPUT = "w-full px-3 py-2.5 bg-slate-700/60 border border-slate-600 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"

export default function ProductForm({ product, onClose, onSuccess }) {
  const isEdit = !!product
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name:          product?.name          || '',
    category:      product?.category      || 'dien-thoai',
    brand:         product?.brand         || '',
    brandName:     product?.brandName     || '',
    price:         product?.price         || '',
    originalPrice: product?.originalPrice || '',
    stock:         product?.stock         ?? '',
    description:   product?.description   || '',
    image:         product?.image         || '',
    thumbnail:     product?.thumbnail     || '',
    status:        product?.status        || 'active',
    isNew:         product?.isNew         ?? false,
    isBestseller:  product?.isBestseller  ?? false,
    isFlashSale:   product?.isFlashSale   ?? false,
    isFeatured:    product?.isFeatured    ?? false,
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.category) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc')
      return
    }
    setLoading(true)
    try {
      const payload = {
        ...form,
        price:         Number(form.price),
        originalPrice: Number(form.originalPrice || form.price),
        stock:         Number(form.stock),
      }
      if (isEdit) {
        await updateProduct(product.id, payload)
        toast.success('Cập nhật sản phẩm thành công!')
      } else {
        await createProduct(payload)
        toast.success('Thêm sản phẩm thành công!')
      }
      onSuccess()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-xl h-full bg-slate-800 border-l border-slate-700 overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700/50 sticky top-0 bg-slate-800 z-10">
          <div className="w-9 h-9 rounded-xl bg-red-600/20 flex items-center justify-center">
            <Package size={16} className="text-red-400" />
          </div>
          <h2 className="text-white font-bold">{isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
          <button onClick={onClose} className="ml-auto text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 px-6 py-6 space-y-4">
          <Field label="Tên sản phẩm *">
            <input className={INPUT} value={form.name} onChange={e => set('name', e.target.value)} placeholder="iPhone 16 Pro Max 256GB" required />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Danh mục *">
              <select className={INPUT} value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </Field>
            <Field label="Thương hiệu *">
              <select className={INPUT} value={form.brand} onChange={e => { set('brand', e.target.value); set('brandName', e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)) }}>
                <option value="">-- Chọn --</option>
                {(BRANDS_MAP[form.category] || []).map(b => (
                  <option key={b} value={b}>{b.charAt(0).toUpperCase() + b.slice(1)}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Giá bán (₫) *">
              <input className={INPUT} type="number" min="0" value={form.price} onChange={e => set('price', e.target.value)} placeholder="15000000" required />
            </Field>
            <Field label="Giá gốc (₫)">
              <input className={INPUT} type="number" min="0" value={form.originalPrice} onChange={e => set('originalPrice', e.target.value)} placeholder="17000000" />
            </Field>
            <Field label="Tồn kho">
              <input className={INPUT} type="number" min="0" value={form.stock} onChange={e => set('stock', e.target.value)} placeholder="50" />
            </Field>
          </div>

          <Field label="Ảnh thumbnail (URL)">
            <input className={INPUT} value={form.thumbnail} onChange={e => set('thumbnail', e.target.value)} placeholder="https://..." />
          </Field>

          <Field label="Ảnh chính (URL)">
            <input className={INPUT} value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://..." />
          </Field>

          <Field label="Mô tả">
            <textarea className={INPUT + ' resize-none'} rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Mô tả sản phẩm..." />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Trạng thái">
              <select className={INPUT} value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="active">Đang bán</option>
                <option value="inactive">Ẩn</option>
              </select>
            </Field>
          </div>

          {/* Badges */}
          <div>
            <label className="text-slate-300 text-xs font-medium mb-2 block">Tags hiển thị</label>
            <div className="grid grid-cols-2 gap-2">
              {[['isNew', 'Hàng mới'], ['isBestseller', 'Bán chạy'], ['isFlashSale', 'Flash sale'], ['isFeatured', 'Nổi bật']].map(([k, lbl]) => (
                <label key={k} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form[k]} onChange={e => set(k, e.target.checked)}
                    className="rounded text-red-500" />
                  <span className="text-slate-300 text-sm">{lbl}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4 border-t border-slate-700/50">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700 text-sm font-medium transition-colors">
              Huỷ
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-bold transition-colors">
              {loading ? 'Đang lưu...' : isEdit ? 'Cập nhật' : 'Thêm sản phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
