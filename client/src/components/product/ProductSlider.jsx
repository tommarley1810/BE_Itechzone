/**
 * ProductSlider.jsx — Slider nằm ngang cho sản phẩm nổi bật
 */
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'

export default function ProductSlider({ products = [], loading = false }) {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 280, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-60 bg-gray-200 dark:bg-dark-700 rounded-2xl animate-pulse" style={{height: 340}} />
        ))}
      </div>
    )
  }

  return (
    <div className="relative group">
      {/* Nút cuộn trái */}
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                   w-10 h-10 rounded-full bg-white dark:bg-dark-700 shadow-lg
                   flex items-center justify-center text-gray-700 dark:text-gray-300
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   hover:bg-gray-50 dark:hover:bg-dark-600 border border-gray-200 dark:border-dark-600"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Danh sách sản phẩm cuộn ngang */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-2"
      >
        {products.map((product, i) => (
          <div key={product.id} className="flex-shrink-0 w-60">
            <ProductCard product={product} index={i} />
          </div>
        ))}
      </div>

      {/* Nút cuộn phải */}
      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                   w-10 h-10 rounded-full bg-white dark:bg-dark-700 shadow-lg
                   flex items-center justify-center text-gray-700 dark:text-gray-300
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   hover:bg-gray-50 dark:hover:bg-dark-600 border border-gray-200 dark:border-dark-600"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
