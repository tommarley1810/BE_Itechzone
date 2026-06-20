/**
 * pages/Admin/Dashboard/index.jsx — Thống kê tổng quan
 */
import { useEffect, useState } from 'react'
import { Package, Users, ShoppingBag, TrendingUp, Clock, AlertCircle } from 'lucide-react'
import { getDashboard } from '@/services/adminService'
import { formatPrice, formatDate } from '@/utils/format'

function StatCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={22} className="text-white" />
        </div>
      </div>
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="text-slate-400 text-sm mt-1">{label}</p>
      {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
    </div>
  )
}

const STATUS_MAP = {
  pending:   { label: 'Chờ xác nhận', cls: 'bg-yellow-500/20 text-yellow-400' },
  confirmed: { label: 'Đã xác nhận',  cls: 'bg-blue-500/20 text-blue-400' },
  shipping:  { label: 'Đang giao',     cls: 'bg-indigo-500/20 text-indigo-400' },
  delivered: { label: 'Đã giao',       cls: 'bg-green-500/20 text-green-400' },
  cancelled: { label: 'Đã hủy',        cls: 'bg-red-500/20 text-red-400' },
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboard()
      .then(r => { setStats(r.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-slate-400 text-center py-20">Đang tải...</div>
  if (!stats) return <div className="text-red-400 text-center py-20">Không tải được dữ liệu</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Tổng quan hệ thống ITechZone</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Package}     label="Sản phẩm"       value={stats.totalProducts}            color="bg-blue-600" />
        <StatCard icon={Users}       label="Khách hàng"      value={stats.totalUsers}               color="bg-emerald-600" />
        <StatCard icon={ShoppingBag} label="Đơn hàng"        value={stats.totalOrders}              color="bg-violet-600" />
        <StatCard icon={TrendingUp}  label="Doanh thu"       value={formatPrice(stats.totalRevenue)} color="bg-red-600" />
      </div>

      {/* Pending requests alert */}
      {stats.pendingRequests > 0 && (
        <div className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
          <AlertCircle size={20} className="text-amber-400 flex-shrink-0" />
          <p className="text-amber-300 text-sm">
            Có <strong>{stats.pendingRequests}</strong> yêu cầu đang chờ duyệt từ nhân viên
          </p>
          <a href="/admin/requests" className="ml-auto text-xs text-amber-400 underline">Xem ngay</a>
        </div>
      )}

      {/* Recent orders */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700/50 flex items-center gap-2">
          <Clock size={16} className="text-slate-400" />
          <h2 className="text-white font-semibold text-sm">Đơn hàng gần đây</h2>
        </div>
        <div className="divide-y divide-slate-700/30">
          {stats.recentOrders.map(order => {
            const s = STATUS_MAP[order.status] || STATUS_MAP.pending
            return (
              <div key={order.id} className="px-6 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{order.user?.name}</p>
                  <p className="text-slate-400 text-xs">{order.user?.email} · {formatDate(order.createdAt)}</p>
                </div>
                <p className="text-red-400 font-bold text-sm">{formatPrice(order.totalAmount)}</p>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${s.cls}`}>{s.label}</span>
              </div>
            )
          })}
          {!stats.recentOrders.length && <p className="text-slate-500 text-sm text-center py-8">Chưa có đơn hàng nào</p>}
        </div>
      </div>
    </div>
  )
}
