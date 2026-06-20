/**
 * SelectField.jsx — Select dropdown có label
 */
import { ChevronDown } from 'lucide-react'

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  required,
  disabled,
  placeholder = 'Chọn...',
  className = '',
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}{required && <span className="text-primary ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full px-4 py-2.5 pr-10 rounded-xl text-sm border appearance-none
            bg-white dark:bg-dark-800
            text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-primary-500
            disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
            ${error
              ? 'border-red-400'
              : 'border-gray-200 dark:border-dark-600 focus:border-primary-500'
            }`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
