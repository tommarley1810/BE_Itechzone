/**
 * StarRating.jsx — Hiển thị sao đánh giá
 */
import { Star } from 'lucide-react'

export default function StarRating({ rating = 0, reviewCount, size = 'sm', showCount = true, className = '' }) {
  const stars = 5
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5

  const iconSize = size === 'sm' ? 12 : size === 'md' ? 14 : 16

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: stars }).map((_, i) => (
          <Star
            key={i}
            size={iconSize}
            className={
              i < fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : i === fullStars && hasHalf
                ? 'fill-yellow-200 text-yellow-400'
                : 'fill-gray-200 text-gray-300 dark:fill-gray-700 dark:text-gray-600'
            }
          />
        ))}
      </div>

      {/* Rating number */}
      <span className={`font-semibold text-gray-700 dark:text-gray-300 ${
        size === 'sm' ? 'text-xs' : 'text-sm'
      }`}>
        {rating.toFixed(1)}
      </span>

      {/* Review count */}
      {showCount && reviewCount !== undefined && (
        <span className={`text-gray-400 dark:text-gray-500 ${
          size === 'sm' ? 'text-xs' : 'text-sm'
        }`}>
          ({reviewCount.toLocaleString('vi-VN')})
        </span>
      )}
    </div>
  )
}
