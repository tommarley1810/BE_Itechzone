/**
 * pages/Tablets/index.jsx
 * Trang danh sách máy tính bảng
 */
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'

import ProductGrid from '@/components/product/ProductGrid'
import ProductFilter from '@/components/product/ProductFilter'
import ProductSort from '@/components/product/ProductSort'
import Breadcrumb from '@/components/common/Breadcrumb'
import { getProducts } from '@/services/productService'
import { TABLET_BRANDS, ITEMS_PER_PAGE } from '@/constants'

export default function Tablets() {
  const [searchParams] = useSearchParams()
  const [products, setProducts]       = useState([])
  const [loading, setLoading]         = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [total, setTotal]             = useState(0)
  const [totalPages, setTotalPages]   = useState(1)
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

  const hasMore = page < totalPages

  const fetchProducts = async (p = 1, append = false) => {
    append ? setLoadingMore(true) : setLoading(true)
    try {
      const res = await getProducts({
        category: 'may-tinh-bang',
        filters,
        sort,
        page:    p,
        perPage: ITEMS_PER_PAGE,
      })
      setProducts(prev => append ? [...prev, ...res.data] : res.data)
      setTotal(res.total)
      setTotalPages(res.totalPages)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    setPage(1)
    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const res = await getProducts({
          category: 'may-tinh-bang',
          filters,
          sort,
          page:    1,
          perPage: ITEMS_PER_PAGE,
        })
        if (!cancelled) {
          setProducts(res.data)
          setTotal(res.total)
          setTotalPages(res.totalPages)
        }
      } catch (err) {
        console.error(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    setFilters({ brands: [], priceMin: undefined, priceMax: undefined, rams: [], storages: [] })
    setSort('default')
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchProducts(nextPage, true)
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-white dark:bg-dark-900 border-b border-gray-100 dark:border-dark-800 py-5">
        <div className="container-custom">
          <Breadcrumb items={[{ label: 'Máy tính bảng', href: '/may-tinh-bang' }]} />
          <div className="flex items-center justify-between mt-3">
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Máy tính bảng</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Khám phá {total} sản phẩm chính hãng
              </p>
            </div>
            {/* Nút bộ lọc trên mobile */}
            <button
              onClick={() => setShowMobileFilter(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-dark-800
                         border border-gray-200 dark:border-dark-700 rounded-xl text-sm font-semibold
                         text-gray-700 dark:text-gray-300"
            >
              <SlidersHorizontal size={16} /> Bộ lọc
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex gap-6">
          {/* Sidebar bộ lọc — Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilter
              brands={TABLET_BRANDS}
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              type="tablet"
            />
          </aside>

          {/* Nội dung chính */}
          <div className="flex-1 min-w-0">
            {/* Thanh sắp xếp */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-4 mb-6
                            border border-gray-100 dark:border-dark-700">
              <ProductSort value={sort} onChange={(v) => { setSort(v); setPage(1) }} total={total} />
            </div>

            {/* Hiển thị các bộ lọc đang áp dụng */}
            {(filters.brands.length > 0 || filters.priceMin !== undefined) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.brands.map(b => (
                  <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                                          bg-primary-50 dark:bg-primary-950 text-primary text-xs font-semibold">
                    {TABLET_BRANDS.find(br => br.id === b)?.name || b}
                    <button onClick={() => handleFilterChange('brands', filters.brands.filter(x => x !== b))}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Lưới sản phẩm */}
            <ProductGrid products={products} loading={loading}
              emptyTitle="Không tìm thấy máy tính bảng"
              emptyDesc="Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác."
            />

            {/* Nút Xem thêm */}
            {hasMore && !loading && (
              <div className="flex justify-center mt-10">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-base
                             bg-gradient-to-r from-blue-600 to-indigo-700 text-white
                             shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40
                             disabled:opacity-60 transition-all duration-300"
                >
                  {loadingMore ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Đang tải...
                    </>
                  ) : (
                    <>
                      Xem thêm máy tính bảng
                      <span className="text-sm opacity-75">({total - products.length} còn lại)</span>
                    </>
                  )}
                </motion.button>
              </div>
            )}
            {!hasMore && !loading && products.length > 0 && (
              <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-10">
                Đã hiển thị tất cả {total} máy tính bảng
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Overlay bộ lọc trên mobile */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-modal flex lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowMobileFilter(false)} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            className="relative w-80 bg-white dark:bg-dark-900 h-full overflow-y-auto p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900 dark:text-white">Bộ lọc</h2>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <ProductFilter
              brands={TABLET_BRANDS}
              filters={filters}
              onFilterChange={(k, v) => { handleFilterChange(k, v); setShowMobileFilter(false) }}
              onReset={() => { handleReset(); setShowMobileFilter(false) }}
              type="tablet"
            />
          </motion.div>
        </div>
      )}
    </div>
  )
}
