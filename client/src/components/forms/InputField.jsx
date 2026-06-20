/**
 * InputField.jsx — Input có label và validate
 */
export default function InputField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required,
  disabled,
  leftIcon,
  rightElement,
  className = '',
  hint,
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}{required && <span className="text-primary ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all duration-200
            bg-white dark:bg-dark-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-600
            focus:outline-none focus:ring-2 focus:ring-primary-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${leftIcon ? 'pl-10' : ''}
            ${rightElement ? 'pr-12' : ''}
            ${error
              ? 'border-red-400 focus:border-red-400'
              : 'border-gray-200 dark:border-dark-600 focus:border-primary-500'
            }`}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}
