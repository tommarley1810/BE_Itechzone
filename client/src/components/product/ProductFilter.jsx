/**
 * ProductFilter.jsx — Bộ lọc sản phẩm (sidebar)
 */
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { useState } from 'react'
import { PRICE_RANGES, RAM_OPTIONS, STORAGE_OPTIONS } from '@/constants'
import { formatPrice } from '@/utils/format'

// Section có thể đóng/mở
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-100 dark:border-dark-700 pb-4 mb-4 last:border-0 last:mb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold
                   text-gray-800 dark:text-gray-200 mb-3"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && children}
    </div>
  )
}

export default function ProductFilter({ brands = [], filters, onFilterChange, onReset, type = 'phone' }) {
  // Các filter đang được chọn
  const activeBrands = filters?.brands || []
  const activeRams = filters?.rams || []
  const activeStorages = filters?.storages || []

  // Toggle hãng sản xuất
  const toggleBrand = (brandId) => {
    const next = activeBrands.includes(brandId)
      ? activeBrands.filter(b => b !== brandId)
      : [...activeBrands, brandId]
    onFilterChange('brands', next)
  }

  // Đặt khoảng giá
  const setPriceRange = (range) => {
    onFilterChange('priceMin', range.min)
    onFilterChange('priceMax', range.max)
  }

  // Toggle RAM
  const toggleRam = (ram) => {
    const next = activeRams.includes(ram)
      ? activeRams.filter(r => r !== ram)
      : [...activeRams, ram]
    onFilterChange('rams', next)
  }

  // Toggle bộ nhớ trong
  const toggleStorage = (storage) => {
    const next = activeStorages.includes(storage)
      ? activeStorages.filter(s => s !== storage)
      : [...activeStorages, storage]
    onFilterChange('storages', next)
  }

  // Kiểm tra xem có filter nào đang active không
  const hasActiveFilters = activeBrands.length > 0 || activeRams.length > 0 || activeStorages.length > 0 ||
    filters?.priceMin !== undefined || filters?.priceMax !== undefined

  return (
    <aside className="bg-white dark:bg-dark-800 rounded-2xl p-5 border border-gray-100 dark:border-dark-700 sticky top-24">
      {/* Tiêu đề bộ lọc */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-gray-900 dark:text-white text-base">Bộ lọc</h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary-700 font-medium"
          >
            <X size={12} /> Xóa lọc
          </button>
        )}
      </div>

      {/* Lọc theo hãng */}
      <FilterSection title="Hãng sản xuất">
        <div className="space-y-2">
          {brands.map(brand => (
            <label key={brand.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeBrands.includes(brand.id)}
                onChange={() => toggleBrand(brand.id)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                {brand.name}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Lọc theo giá */}
      <FilterSection title="Mức giá">
        <div className="space-y-2">
          {PRICE_RANGES.map(range => {
            const isActive = filters?.priceMin === range.min && filters?.priceMax === range.max
            return (
              <button
                key={range.id}
                onClick={() => setPriceRange(isActive ? { min: undefined, max: undefined } : range)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors duration-150 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300 font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-700'
                }`}
              >
                {range.label}
              </button>
            )
          })}
        </div>
      </FilterSection>

      {/* Lọc theo RAM (chỉ hiển thị với điện thoại) */}
      {type === 'phone' && (
        <FilterSection title="RAM">
          <div className="flex flex-wrap gap-2">
            {RAM_OPTIONS.map(ram => (
              <button
                key={ram}
                onClick={() => toggleRam(ram)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                  activeRams.includes(ram)
                    ? 'bg-primary text-white border-primary'
                    : 'border-gray-200 dark:border-dark-600 text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary'
                }`}
              >
                {ram}GB
              </button>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Lọc theo bộ nhớ */}
      <FilterSection title="Bộ nhớ">
        <div className="flex flex-wrap gap-2">
          {STORAGE_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => toggleStorage(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                activeStorages.includes(s)
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-200 dark:border-dark-600 text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary'
              }`}
            >
              {s >= 1024 ? `${s/1024}TB` : `${s}GB`}
            </button>
          ))}
        </div>
      </FilterSection>
    </aside>
  )
}
