/**
 * pages/Search/index.jsx
 * Trang tìm kiếm sản phẩm
 */
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { motion } from 'framer-motion'

import ProductGrid from '@/components/product/ProductGrid'
import Breadcrumb from '@/components/common/Breadcrumb'
import EmptyState from '@/components/ui/EmptyState'
import { searchProducts } from '@/services/productService'
import useDebounce from '@/hooks/useDebounce'

// Danh sách gợi ý tìm kiếm phổ biến
const POPULAR_SEARCHES = ['iPhone 15', 'Samsung S24', 'iPad Pro', 'Xiaomi 14', 'Galaxy Tab']

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [inputValue, setInputValue] = useState(searchParams.get('q') || '')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  // Debounce để tránh gọi API quá nhiều lần
  const debouncedQuery = useDebounce(inputValue, 400)

  useEffect(() => {
    const query = debouncedQuery.trim()
    if (query.length < 2) {
      setProducts([])
      setSearched(false)
      return
    }

    setLoading(true)
    setSearchParams({ q: query }, { replace: true })

    searchProducts(query)
      .then(data => {
        setProducts(data)
        setSearched(true)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [debouncedQuery])

  // Xóa nội dung tìm kiếm
  const handleClear = () => {
    setInputValue('')
    setProducts([])
    setSearched(false)
    setSearchParams({}, { replace: true })
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-white dark:bg-dark-900 border-b border-gray-100 dark:border-dark-800 py-5">
        <div className="container-custom">
          <Breadcrumb items={[{ label: 'Tìm kiếm', href: '/tim-kiem' }]} />
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-3">Tìm kiếm</h1>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Ô tìm kiếm */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhập tên sản phẩm, thương hiệu..."
              autoFocus
              className="w-full pl-14 pr-12 py-4 rounded-2xl text-base
                         border-2 border-gray-200 dark:border-dark-600
                         bg-white dark:bg-dark-800
                         text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500
                         focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
                         transition-all duration-200 shadow-sm"
            />
            <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            {inputValue && (
              <button
                onClick={handleClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-xl
                           text-gray-400 hover:text-gray-600 hover:bg-gray-100
                           dark:hover:bg-dark-700 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Gợi ý tìm kiếm phổ biến */}
          {!inputValue && (
            <div className="mt-4 flex flex-wrap gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 w-full">Tìm kiếm phổ biến:</p>
              {POPULAR_SEARCHES.map(tag => (
                <button
                  key={tag}
                  onClick={() => setInputValue(tag)}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-dark-700
                             text-sm text-gray-700 dark:text-gray-300
                             hover:bg-primary-50 dark:hover:bg-primary-950 hover:text-primary
                             transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Kết quả tìm kiếm */}
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Tìm thấy{' '}
              <span className="font-bold text-gray-900 dark:text-white">{products.length}</span>
              {' '}kết quả cho "
              <span className="font-bold text-primary">{debouncedQuery}</span>"
            </p>

            <ProductGrid
              products={products}
              loading={loading}
              emptyTitle="Không tìm thấy sản phẩm"
              emptyDesc={`Không có kết quả cho "${debouncedQuery}". Hãy thử từ khóa khác.`}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}
