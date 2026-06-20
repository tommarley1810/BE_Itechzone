/**
 * Badge.jsx — Nhãn trạng thái sản phẩm
 */
export default function Badge({ label, type = 'default', className = '' }) {
  const types = {
    default:  'bg-gray-100 text-gray-700 dark:bg-dark-700 dark:text-gray-300',
    primary:  'bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300',
    success:  'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
    warning:  'bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400',
    danger:   'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400',
    new:      'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
    hot:      'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-400',
    sale:     'bg-primary text-white',
    premium:  'bg-gradient-to-r from-yellow-400 to-amber-500 text-white',
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${types[type] || types.default} ${className}`}>
      {label}
    </span>
  )
}
