/**
 * pages/Admin/Products/index.jsx — Quản lý sản phẩm
 */
import { useEffect, useState } from 'react'
import { Plus, Search, Edit2, Trash2, AlertTriangle, X } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { getProducts, deleteProduct } from '@/services/adminService'
import { formatPrice } from '@/utils/format'
import useAdminStore from '@/store/useAdminStore'
import ProductForm from './ProductForm'

export default function AdminProducts() {
  const { admin } = useAdminStore()
  const isAdmin = admin?.role === 'admin'

  const [data, setData] = useState({ products: [], total: 0 })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteModal, setDeleteModal] = useState(null) // { id, name }
  const [deleteNote, setDeleteNote] = useState('')

  const load = () => {
    setLoading(true)
    getProducts({ page, limit: 15, search: search || undefined })
      .then(r => { setData(r.data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [page, search])

  const handleDelete = async () => {
    try {
      const res = await deleteProduct(deleteModal.id, deleteNote)
      if (res.data?.status === 'pending') {
        toast.success('Đã gửi yêu cầu xoá cho Admin duyệt')
      } else {
        toast.success('Đã xoá sản phẩm')
      }
      setDeleteModal(null)
      setDeleteNote('')
      load()
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sản phẩm</h1>
          <p className="text-slate-400 text-sm mt-1">Quản lý danh mục sản phẩm</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true) }}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors">
          <Plus size={16} /> Thêm sản phẩm
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="Tìm theo tên, thương hiệu..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-red-500" />
      </div>

      {/* Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50">
                {['Sản phẩm', 'Danh mục', 'Giá', 'Tồn kho', 'Trạng thái', 'Thao tác'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-slate-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-12 text-slate-400">Đang tải...</td></tr>
              ) : data.products.map(p => (
                <tr key={p.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.thumbnail || p.image} alt={p.name}
                        className="w-10 h-10 rounded-xl object-cover bg-slate-700" />
                      <div>
                        <p className="text-white font-medium line-clamp-1 max-w-[200px]">{p.name}</p>
                        <p className="text-slate-500 text-xs">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{p.category}</td>
                  <td className="px-4 py-3 text-red-400 font-semibold">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${p.stock === 0 ? 'text-red-400' : p.stock < 5 ? 'text-yellow-400' : 'text-slate-300'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${p.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-slate-600 text-slate-400'}`}>
                      {p.status === 'active' ? 'Đang bán' : 'Ẩn'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setEditing(p); setShowForm(true) }}
                        className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => setDeleteModal({ id: p.id, name: p.name })}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && !data.products.length && (
                <tr><td colSpan={6} className="text-center py-12 text-slate-500">Không có sản phẩm</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-700/50 flex items-center justify-between">
            <p className="text-slate-400 text-sm">Tổng: {data.total} sản phẩm</p>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 rounded-lg text-sm text-slate-300 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed">
                ← Trước
              </button>
              <span className="px-3 py-1.5 text-slate-400 text-sm">{page} / {data.totalPages}</span>
              <button disabled={page === data.totalPages} onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 rounded-lg text-sm text-slate-300 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed">
                Tiếp →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editing}
          onClose={() => setShowForm(false)}
          onSuccess={() => { setShowForm(false); load() }}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-white font-bold">Xoá sản phẩm</h3>
                <p className="text-slate-400 text-xs">{deleteModal.name}</p>
              </div>
              <button onClick={() => setDeleteModal(null)} className="ml-auto text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            {!isAdmin && (
              <p className="text-amber-400 text-sm mb-4 bg-amber-500/10 rounded-xl px-3 py-2">
                ⚠️ Bạn là Nhân viên — yêu cầu xoá sẽ gửi cho Admin duyệt
              </p>
            )}
            <textarea value={deleteNote} onChange={e => setDeleteNote(e.target.value)}
              placeholder="Ghi chú lý do xoá (tùy chọn)..."
              className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-red-500 resize-none mb-4"
              rows={3} />
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700 text-sm font-medium transition-colors">
                Huỷ
              </button>
              <button onClick={handleDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors">
                {isAdmin ? 'Xoá ngay' : 'Gửi yêu cầu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
