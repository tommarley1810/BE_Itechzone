/**
 * SkeletonCard.jsx — Skeleton loading cho Product Card
 */
export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-dark-700 animate-pulse">
      {/* Image */}
      <div className="bg-gray-200 dark:bg-dark-700 aspect-square" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        <div className="h-3 bg-gray-200 dark:bg-dark-700 rounded-full w-16" />
        {/* Name */}
        <div className="space-y-1.5">
          <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded-full w-full" />
          <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded-full w-3/4" />
        </div>
        {/* Rating */}
        <div className="h-3 bg-gray-200 dark:bg-dark-700 rounded-full w-24" />
        {/* Price */}
        <div className="space-y-1">
          <div className="h-5 bg-gray-200 dark:bg-dark-700 rounded-full w-28" />
          <div className="h-3 bg-gray-200 dark:bg-dark-700 rounded-full w-20" />
        </div>
        {/* Button */}
        <div className="h-9 bg-gray-200 dark:bg-dark-700 rounded-xl" />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
