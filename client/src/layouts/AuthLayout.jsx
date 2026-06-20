/**
 * layouts/AuthLayout.jsx
 * Layout cho trang đăng nhập / đăng ký
 */
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import Logo from '@/components/common/Logo'
import useThemeStore from '@/store/useThemeStore'
import { useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function AuthLayout() {
  const { theme, toggleTheme, initTheme } = useThemeStore()

  // Khởi tạo theme khi mount
  useEffect(() => { initTheme() }, [])

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-dark-950">
      {/* Left: Brand panel (ẩn trên mobile) */}
      <div className="hidden lg:flex flex-col w-[480px] flex-shrink-0
                      bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900
                      relative overflow-hidden p-12">

        {/* Trang trí nền */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

        {/* Logo */}
        <Logo size="lg" white />

        <div className="mt-auto">
          <h2 className="text-4xl font-display font-black text-white leading-tight mb-4">
            Nâng tầm<br />
            <span className="text-primary">trải nghiệm</span><br />
            công nghệ
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Mua sắm iPhone, Samsung, iPad chính hãng với giá tốt nhất.
            Giao hàng nhanh chóng, đổi trả dễ dàng.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 mt-8">
            {['100% Hàng chính hãng', 'Bảo hành 12 tháng', 'Miễn phí giao hàng'].map(badge => (
              <span key={badge}
                    className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10
                               text-xs text-white/80 font-medium">
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Khu vực form */}
      <div className="flex-1 flex flex-col">
        {/* Thanh trên */}
        <div className="flex items-center justify-between p-6">
          <div className="lg:hidden">
            <Logo size="md" />
          </div>
          <div className="ml-auto flex items-center gap-3">
            {/* Nút chuyển đổi theme */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
              ← Về trang chủ
            </Link>
          </div>
        </div>

        {/* Outlet — nơi render LoginPage / RegisterPage */}
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
