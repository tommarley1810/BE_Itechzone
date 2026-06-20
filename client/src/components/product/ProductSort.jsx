/**
 * ProductSort.jsx — Dropdown sắp xếp sản phẩm
 */
import { SORT_OPTIONS } from '@/constants'

export default function ProductSort({ value, onChange, total }) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      {/* Tổng số sản phẩm tìm được */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Tìm thấy{' '}
        <span className="font-semibold text-gray-900 dark:text-white">{total?.toLocaleString('vi-VN')}</span>
        {' '}sản phẩm
      </p>

      {/* Dropdown sắp xếp */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">Sắp xếp:</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm border border-gray-200 dark:border-dark-600
                     bg-white dark:bg-dark-800
                     text-gray-800 dark:text-gray-200
                     px-3 py-2 rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-primary-500
                     cursor-pointer transition-all"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
