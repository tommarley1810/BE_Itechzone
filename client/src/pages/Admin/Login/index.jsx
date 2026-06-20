/**
 * pages/Admin/Login/index.jsx — Trang đăng nhập Admin Panel
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import { toast } from 'react-hot-toast'
import useAdminStore from '@/store/useAdminStore'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { login, isLoading } = useAdminStore()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await login(form.email, form.password)
    if (res.success) {
      toast.success('Đăng nhập thành công!')
      navigate('/admin/dashboard')
    } else {
      toast.error(res.error || 'Đăng nhập thất bại')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-600 shadow-lg mb-4">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">ITechZone Admin</h1>
          <p className="text-slate-400 text-sm mt-1">Đăng nhập vào hệ thống quản trị</p>
        </div>

        {/* Form */}
        <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email" required value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@itechzone.vn"
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-1.5 block">Mật khẩu</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPw ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold rounded-xl transition-colors">
              {isLoading ? 'Đang đăng nhập...' : <><LogIn size={18} />Đăng nhập</>}
            </button>
          </form>

          <div className="mt-6 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
            <p className="text-xs text-slate-400 font-medium mb-2">Tài khoản demo:</p>
            <div className="space-y-1 text-xs text-slate-500">
              <p>Admin: <span className="text-slate-300">admin@itechzone.vn / Admin@123</span></p>
              <p>Staff: <span className="text-slate-300">staff@itechzone.vn / Staff@123</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
