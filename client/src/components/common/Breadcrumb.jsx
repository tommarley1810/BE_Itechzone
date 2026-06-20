/**
 * Breadcrumb.jsx — Đường dẫn bánh mì
 */
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
      <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
        <Home size={14} />
        <span>Trang chủ</span>
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <ChevronRight size={14} className="text-gray-300 dark:text-gray-600" />
          {index === items.length - 1 ? (
            <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
          ) : (
            <Link to={item.href} className="hover:text-primary transition-colors">{item.label}</Link>
          )}
        </div>
      ))}
    </nav>
  )
}
