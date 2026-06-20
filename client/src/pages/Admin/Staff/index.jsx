/**
 * pages/Admin/Staff/index.jsx — Quản lý nhân viên (Admin only)
 */
import { useEffect, useState } from 'react'
import { Plus, Trash2, X, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { getStaff, createStaff, deleteStaff } from '@/services/adminService'
import { formatDate } from '@/utils/format'

export default function AdminStaff() {
  const [data, setData] = useState({ users: [] })
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const load = () => {
    setLoading(true)
    getStaff()
      .then(r => { setData(r.data); setLoading(false) })
      .catch(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) return toast.error('Vui lòng điền đầy đủ')
    if (form.password.length < 6) return toast.error('Mật khẩu tối thiểu 6 ký tự')
    setSubmitting(true)
    try {
      await createStaff(form)
      toast.success('Tạo tài khoản nhân viên thành công!')
      setForm({ name: '', email: '', password: '' })
      setShowForm(false)
      load()
    } catch (err) { toast.error(err.message) }
    finally { setSubmitting(false) }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Xoá nhân viên "${name}"?`)) return
    try { await deleteStaff(id); toast.success('Đã xoá nhân viên'); load() }
    catch (err) { toast.error(err.message) }
  }

  const INPUT = "w-full px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-red-500"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Nhân viên</h1>
          <p className="text-slate-400 text-sm mt-1">Quản lý tài khoản nhân viên</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors">
          <Plus size={16} /> Thêm nhân viên
        </button>
      </div>

      {/* Staff list */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50">
                {['Nhân viên', 'Email', 'Ngày tạo', 'Trạng thái', 'Thao tác'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-slate-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-12 text-slate-400">Đang tải...</td></tr>
              ) : data.users?.map(u => (
                <tr key={u.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold text-sm">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{u.email}</td>
                  <td className="px-4 py-3 text-slate-400">{formatDate(u.createdAt)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${u.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {u.isActive ? 'Hoạt động' : 'Khoá'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(u.id, u.name)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && !data.users?.length && (
                <tr><td colSpan={5} className="text-center py-12 text-slate-500">Chưa có nhân viên nào</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Staff Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">Tạo tài khoản nhân viên</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-slate-400 text-xs mb-1.5 block">Họ tên *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className={INPUT} placeholder="Nguyễn Văn A" required />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1.5 block">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className={INPUT} placeholder="nhanvien@itechzone.vn" required />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1.5 block">Mật khẩu *</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className={INPUT + ' pr-10'} placeholder="Tối thiểu 6 ký tự" required />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700 text-sm font-medium">
                  Huỷ
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-bold">
                  {submitting ? 'Đang tạo...' : 'Tạo tài khoản'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
