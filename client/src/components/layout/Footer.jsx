/**
 * Footer.jsx — Footer chuyên nghiệp ITechZone
 */
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Shield, Truck, RefreshCw, Headphones } from 'lucide-react'

// Icon mạng xã hội (SVG inline vì lucide-react không có brand icons)
const SocialFacebook = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const SocialYoutube = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
  </svg>
)
const SocialInstagram = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const SocialTiktok = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.14a8.18 8.18 0 0 0 4.78 1.53V7.22a4.85 4.85 0 0 1-1.02-.53z"/>
  </svg>
)
import Logo from '@/components/common/Logo'
import { FOOTER_LINKS, ROUTES } from '@/constants'

const POLICIES = [
  { icon: Truck,       title: 'Miễn phí giao hàng', desc: 'Đơn từ 5 triệu đồng' },
  { icon: RefreshCw,   title: 'Đổi trả dễ dàng',   desc: '30 ngày đổi trả miễn phí' },
  { icon: Shield,      title: 'Bảo hành chính hãng', desc: 'Bảo hành 12 tháng' },
  { icon: Headphones,  title: 'Hỗ trợ 24/7',         desc: 'Tư vấn miễn phí' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark-900 dark:bg-dark-950 text-gray-400">
      {/* Policy Bar */}
      <div className="border-b border-dark-700 py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {POLICIES.map((policy) => (
              <div key={policy.title} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20
                                flex items-center justify-center flex-shrink-0">
                  <policy.icon size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{policy.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{policy.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-14">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Logo size="lg" white />
              <p className="text-sm text-gray-500 mt-4 mb-6 leading-relaxed max-w-xs">
                ITechZone — Hệ thống bán lẻ công nghệ đáng tin cậy hàng đầu Việt Nam.
                Chuyên cung cấp điện thoại và máy tính bảng chính hãng giá tốt nhất.
              </p>

              {/* Thông tin liên hệ */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Phone size={15} className="text-primary flex-shrink-0" />
                  <span>Hotline: <strong className="text-white">1234 5678</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={15} className="text-primary flex-shrink-0" />
                  <span>hotro@itechzone.vn</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="text-primary flex-shrink-0 mt-0.5" />
                  <span>123 Nguyễn Huệ, Q.1, TP.HCM</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={15} className="text-primary flex-shrink-0" />
                  <span>8:00 - 22:00 (Tất cả các ngày)</span>
                </div>
              </div>

              {/* Mạng xã hội */}
              <div className="flex items-center gap-3 mt-6">
                {[SocialFacebook, SocialYoutube, SocialInstagram, SocialTiktok].map((Icon, i) => (
                  <a key={i} href="#"
                     className="w-9 h-9 rounded-xl bg-dark-700 hover:bg-primary
                                flex items-center justify-center
                                text-gray-400 hover:text-white
                                transition-all duration-200">
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Cột liên kết Công ty */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5">Về ITechZone</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.company.map(link => (
                  <li key={link.label}>
                    <a href={link.href}
                       className="text-sm hover:text-primary transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cột Hỗ trợ */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5">Hỗ trợ khách hàng</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.support.map(link => (
                  <li key={link.label}>
                    <a href={link.href}
                       className="text-sm hover:text-primary transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cột Sản phẩm */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5">Sản phẩm</h4>
              <ul className="space-y-3">
                <li><Link to={ROUTES.PHONES} className="text-sm hover:text-primary transition-colors">Điện thoại</Link></li>
                <li><Link to={ROUTES.TABLETS} className="text-sm hover:text-primary transition-colors">Máy tính bảng</Link></li>
                <li><a href="#" className="text-sm hover:text-primary transition-colors">iPhone chính hãng</a></li>
                <li><a href="#" className="text-sm hover:text-primary transition-colors">Samsung Galaxy</a></li>
                <li><a href="#" className="text-sm hover:text-primary transition-colors">iPad chính hãng</a></li>
                <li><a href="#" className="text-sm hover:text-primary transition-colors">Flash Sale</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-700 py-5">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>&copy; {year} ITechZone. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Chính sách bảo mật</a>
            <span className="text-dark-600">|</span>
            <a href="#" className="hover:text-gray-400 transition-colors">Quy định sử dụng</a>
          </div>
          {/* Logo thanh toán */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-dark-700 text-gray-400 text-xs font-mono">VISA</span>
            <span className="px-3 py-1 rounded-lg bg-dark-700 text-gray-400 text-xs font-mono">MOMO</span>
            <span className="px-3 py-1 rounded-lg bg-dark-700 text-gray-400 text-xs font-mono">VNPAY</span>
            <span className="px-3 py-1 rounded-lg bg-dark-700 text-gray-400 text-xs font-mono">COD</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
