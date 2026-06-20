/**
 * Button.jsx — Component nút bấm tái sử dụng
 */
import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-primary hover:bg-primary-700 text-white shadow-sm hover:shadow-primary active:scale-95',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-dark-700 dark:hover:bg-dark-600 dark:text-gray-200',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-800',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  dark: 'bg-dark-900 hover:bg-dark-800 text-white border border-dark-700',
}

const sizes = {
  xs: 'px-3 py-1.5 text-xs rounded-lg gap-1',
  sm: 'px-4 py-2 text-sm rounded-xl gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-2xl gap-2',
  xl: 'px-8 py-4 text-lg rounded-2xl gap-2.5',
}

const Button = forwardRef(function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  type = 'button',
  ...props
}, ref) {
  const baseClass = `inline-flex items-center justify-center font-semibold
    transition-all duration-200 focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      className={`${baseClass} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Đang xử lý...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  )
})

export default Button
