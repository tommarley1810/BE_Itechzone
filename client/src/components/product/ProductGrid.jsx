/**
 * ProductGrid.jsx — Lưới hiển thị sản phẩm
 */
import { SkeletonGrid } from '@/components/ui/SkeletonCard'
import EmptyState from '@/components/ui/EmptyState'
import ProductCard from './ProductCard'

export default function ProductGrid({ products = [], loading = false, emptyTitle, emptyDesc }) {
  if (loading) return <SkeletonGrid count={8} />

  if (!loading && products.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDesc} />
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  )
}
