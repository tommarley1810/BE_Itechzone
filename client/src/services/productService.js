/**
 * services/productService.js
 * Service xử lý tất cả API calls liên quan đến sản phẩm
 * Gọi trực tiếp Backend API — không dùng mock data
 */

import api from './api'
import { ITEMS_PER_PAGE } from '@/constants'

// ================================
// NORMALIZE — Map backend product → shape UI expects
// ================================
function normalizeProduct(p) {
  if (!p) return null

  // Đảm bảo images là mảng và không rỗng
  const images = Array.isArray(p.images) && p.images.length > 0
    ? p.images
    : p.thumbnail ? [p.thumbnail] : p.image ? [p.image] : []

  // Tính discount %
  const discount = p.originalPrice > p.price
    ? Math.round((1 - p.price / p.originalPrice) * 100)
    : 0

  return {
    ...p,
    images,
    discount,
    // Fields mà UI dùng nhưng không có trong DB — set giá trị mặc định
    reviewCount:    p.reviewCount    ?? (Math.floor(p.sold / 10) || 0),
    specs:          p.specs          ?? null,
    colors:         p.colors         ?? [],
    storageOptions: p.storageOptions ?? [],
    variants:       Array.isArray(p.variants) ? p.variants : [],
    tags:           p.tags           ?? [],
  }
}

function normalizeProducts(arr) {
  return Array.isArray(arr) ? arr.map(normalizeProduct) : []
}

// ================================
// GET PRODUCTS — Lấy danh sách sản phẩm có filter + sort + phân trang
// ================================
export async function getProducts({
  category,
  filters = {},
  sort = 'default',
  page = 1,
  perPage = ITEMS_PER_PAGE,
} = {}) {
  // Map sort value từ frontend sang backend
  const sortMap = {
    'default':    { sort: 'createdAt', order: 'desc' },
    'price-asc':  { sort: 'price',     order: 'asc'  },
    'price-desc': { sort: 'price',     order: 'desc' },
    'name-asc':   { sort: 'name',      order: 'asc'  },
    'name-desc':  { sort: 'name',      order: 'desc' },
    'newest':     { sort: 'createdAt', order: 'desc' },
    'bestseller': { sort: 'sold',      order: 'desc' },
    'rating':     { sort: 'rating',    order: 'desc' },
  }

  const { sort: sortField, order } = sortMap[sort] || sortMap['default']

  // Build params
  const params = {
    page,
    limit: perPage,
    sort:  sortField,
    order,
  }

  if (category)                              params.category = category
  if (filters.brands && filters.brands.length === 1) params.brand = filters.brands[0]
  if (filters.brands && filters.brands.length > 1) {
    // Gửi nhiều brand — backend hiện tại lọc 1 brand; fallback: không filter
    // Có thể mở rộng sau
  }
  if (filters.priceMin !== undefined)        params.minPrice = filters.priceMin
  if (filters.priceMax !== undefined && filters.priceMax !== Infinity)
                                             params.maxPrice = filters.priceMax
  if (filters.search)                        params.q = filters.search

  const res = await api.get('/products', { params })

  // Backend trả về { success, message, data, pagination }
  // API interceptor đã unwrap response.data, nên res = { success, message, data, pagination }
  return {
    data:       normalizeProducts(res.data),
    total:      res.pagination.total,
    totalPages: res.pagination.totalPages,
    page:       res.pagination.page,
  }
}

// ================================
// GET PRODUCT BY SLUG
// ================================
export async function getProductBySlug(slug) {
  const res = await api.get(`/products/slug/${slug}`)
  return normalizeProduct(res.data)
}

// ================================
// GET RELATED PRODUCTS
// ================================
export async function getRelatedProducts(productId, limit = 6) {
  const res = await api.get(`/products/${productId}/related`, { params: { limit } })
  return normalizeProducts(res.data)
}

// ================================
// GET FEATURED PRODUCTS
// ================================
export async function getFeaturedProducts(category, limit = 8) {
  const params = { limit }
  if (category) params.category = category
  const res = await api.get('/products/featured', { params })
  return normalizeProducts(res.data)
}

// ================================
// GET FLASH SALE PRODUCTS
// ================================
export async function getFlashSaleProducts(limit = 8) {
  const res = await api.get('/products/flash-sale', { params: { limit } })
  return normalizeProducts(res.data)
}

// ================================
// GET NEW PRODUCTS
// ================================
export async function getNewProducts(limit = 8) {
  // Chỉ lấy điện thoại và máy tính bảng — không lấy phụ kiện
  const res = await api.get('/products', {
    params: { sort: 'createdAt', order: 'desc', limit, excludeCategory: 'phu-kien' },
  })
  return normalizeProducts(res.data)
}

// ================================
// GET ACCESSORY PRODUCTS
// ================================
export async function getAccessoryProducts(limit = 8) {
  const res = await api.get('/products', {
    params: { category: 'phu-kien', sort: 'sold', order: 'desc', limit },
  })
  return normalizeProducts(res.data)
}

// ================================
// GET BESTSELLER PRODUCTS
// ================================
export async function getBestsellerProducts(brand, limit = 6) {
  const params = { sort: 'sold', order: 'desc', limit }
  if (brand) params.brand = brand
  const res = await api.get('/products', { params })
  return normalizeProducts(res.data)
}

// ================================
// SEARCH PRODUCTS
// ================================
export async function searchProducts(query, limit = 20) {
  if (!query || query.trim().length < 2) return []
  const res = await api.get('/products/search', { params: { q: query, limit } })
  return normalizeProducts(res.data)
}

// ================================
// CREATE PRODUCT
// ================================
export async function createProduct(data) {
  const res = await api.post('/products', data)
  return res.data
}

// ================================
// UPDATE PRODUCT
// ================================
export async function updateProduct(id, data) {
  const res = await api.put(`/products/${id}`, data)
  return res.data
}

// ================================
// DELETE PRODUCT
// ================================
export async function deleteProduct(id) {
  const res = await api.delete(`/products/${id}`)
  return res
}
