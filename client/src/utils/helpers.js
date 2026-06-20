/**
 * utils/helpers.js
 * Các hàm tiện ích chung
 */

/**
 * Debounce function — trì hoãn thực thi hàm
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

/**
 * Scroll lên đầu trang
 */
export function scrollToTop(smooth = true) {
  window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
}

/**
 * Lọc và sắp xếp sản phẩm theo filters
 * @param {Array} products
 * @param {Object} filters
 * @returns {Array}
 */
export function filterProducts(products, filters = {}) {
  let result = [...products]

  // Lọc theo brand
  if (filters.brands && filters.brands.length > 0) {
    result = result.filter(p => filters.brands.includes(p.brand))
  }

  // Lọc theo giá
  if (filters.priceMin !== undefined) {
    result = result.filter(p => p.price >= filters.priceMin)
  }
  if (filters.priceMax !== undefined && filters.priceMax !== Infinity) {
    result = result.filter(p => p.price <= filters.priceMax)
  }

  // Lọc theo RAM
  if (filters.rams && filters.rams.length > 0) {
    result = result.filter(p => {
      const ram = parseInt(p.specs?.ram)
      return filters.rams.includes(ram)
    })
  }

  // Lọc theo Storage
  if (filters.storages && filters.storages.length > 0) {
    result = result.filter(p => {
      const storage = parseInt(p.specs?.storage)
      return filters.storages.includes(storage)
    })
  }

  // Tìm kiếm theo từ khóa
  if (filters.search) {
    const query = filters.search.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.brandName.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query))
    )
  }

  return result
}

/**
 * Sắp xếp sản phẩm
 * @param {Array} products
 * @param {string} sortBy
 * @returns {Array}
 */
export function sortProducts(products, sortBy = 'default') {
  const sorted = [...products]

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    case 'newest':
      return sorted.filter(p => p.isNew).concat(sorted.filter(p => !p.isNew))
    case 'bestseller':
      return sorted.sort((a, b) => b.sold - a.sold)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    default:
      return sorted
  }
}

/**
 * Phân trang
 * @param {Array} items
 * @param {number} page - Trang hiện tại (1-indexed)
 * @param {number} perPage
 * @returns {{data: Array, totalPages: number, total: number}}
 */
export function paginate(items, page = 1, perPage = 12) {
  const total = items.length
  const totalPages = Math.ceil(total / perPage)
  const start = (page - 1) * perPage
  const data = items.slice(start, start + perPage)
  return { data, totalPages, total, page }
}

/**
 * Deep clone object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Lấy sản phẩm liên quan
 * @param {Array} products
 * @param {Object} currentProduct
 * @param {number} limit
 * @returns {Array}
 */
export function getRelatedProducts(products, currentProduct, limit = 4) {
  return products
    .filter(p => p.id !== currentProduct.id && (
      p.brand === currentProduct.brand || p.category === currentProduct.category
    ))
    .slice(0, limit)
}

/**
 * Format storage display
 */
export function formatStorage(gb) {
  if (!gb) return ''
  if (gb >= 1024) return `${gb / 1024}TB`
  return `${gb}GB`
}

/**
 * Tạo array từ 1 đến n
 */
export function range(n) {
  return Array.from({ length: n }, (_, i) => i + 1)
}
