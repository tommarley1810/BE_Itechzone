/**
 * pages/Accessories/index.jsx
 * Trang danh sách phụ kiện (củ sạc, dây sạc)
 */
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X, Plug } from 'lucide-react'

import ProductGrid from '@/components/product/ProductGrid'
import ProductFilter from '@/components/product/ProductFilter'
import ProductSort from '@/components/product/ProductSort'
import Pagination from '@/components/common/Pagination'
import Breadcrumb from '@/components/common/Breadcrumb'
import { getProducts } from '@/services/productService'
import { ITEMS_PER_PAGE } from '@/constants'

const ACCESSORY_BRANDS = [
  { id: 'apple',   name: 'Apple' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'xiaomi',  name: 'Xiaomi' },
  { id: 'anker',   name: 'Anker' },
  { id: 'baseus',  name: 'Baseus' },
  { id: 'oppo',    name: 'OPPO' },
]

export default function Accessories() {
  const [searchParams] = useSearchParams()
  const [products, setProducts]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [total, setTotal]           = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  const [filters, setFilters] = useState({
    brands:   searchParams.get('brand') ? [searchParams.get('brand')] : [],
    priceMin: undefined,
    priceMax: undefined,
    rams:     [],
    storages: [],
  })
  const [sort, setSort] = useState('default')
  const [page, setPage] = useState(1)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getProducts({
        category: 'phu-kien',
        filters,
        sort,
        page,
        perPage: ITEMS_PER_PAGE,
      })
      setProducts(res.data)
      setTotal(res.total)
      setTotalPages(res.totalPages)
    } catch (err) {
      console.error('Lỗi fetch phụ kiện:', err)
    } finally {
      setLoading(false)
    }
  }, [filters, sort, page])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters)
    setPage(1)
  }, [])

  const handleSortChange = useCallback((newSort) => {
    setSort(newSort)
    setPage(1)
  }, [])

  const activeFilterCount = (filters.brands?.length || 0) +
    (filters.priceMin !== undefined ? 1 : 0) +
    (filters.priceMax !== undefined ? 1 : 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-950">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-dark-900 border-b border-gray-100 dark:border-dark-800 py-4">
        <div className="container-custom">
          <Breadcrumb items={[{ label: 'Phụ kiện', href: '/phu-kien' }]} />
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 py-10">
        <div className="container-custom text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Plug size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black">Phụ kiện chính hãng</h1>
              <p className="text-amber-100 mt-1">
                Củ sạc & dây sạc Apple, Samsung, Xiaomi, Anker, Baseus — {total > 0 ? `${total} sản phẩm` : ''}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category pills */}
      <div className="bg-white dark:bg-dark-900 border-b border-gray-100 dark:border-dark-800 py-3">
        <div className="container-custom flex gap-3 overflow-x-auto no-scrollbar">
          {[
            { label: 'Tất cả', brand: null },
            { label: 'Apple', brand: 'apple' },
            { label: 'Samsung', brand: 'samsung' },
            { label: 'Xiaomi', brand: 'xiaomi' },
            { label: 'Anker', brand: 'anker' },
            { label: 'Baseus', brand: 'baseus' },
            { label: 'OPPO', brand: 'oppo' },
          ].map(({ label, brand }) => {
            const active = brand === null
              ? filters.brands.length === 0
              : filters.brands.includes(brand)
            return (
              <button
                key={label}
                onClick={() => handleFilterChange({
                  ...filters,
                  brands: brand ? [brand] : [],
                })}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${
                  active
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400'
                    : 'border-gray-200 dark:border-dark-600 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* Sidebar Filter — Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white dark:bg-dark-800 rounded-2xl shadow-sm p-5">
              <ProductFilter
                brands={ACCESSORY_BRANDS}
                filters={filters}
                onChange={handleFilterChange}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <SlidersHorizontal size={16} />
                  Lọc
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {loading ? 'Đang tải...' : `${total} sản phẩm`}
                </p>
              </div>
              <ProductSort value={sort} onChange={handleSortChange} />
            </div>

            {/* Grid */}
            <ProductGrid products={products} loading={loading} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowMobileFilter(false)} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-dark-800 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Bộ lọc</h2>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>
            <ProductFilter
              brands={ACCESSORY_BRANDS}
              filters={filters}
              onChange={(f) => { handleFilterChange(f); setShowMobileFilter(false) }}
            />
          </motion.div>
        </div>
      )}
    </div>
  )
}
