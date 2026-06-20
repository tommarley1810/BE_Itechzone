/**
 * src/modules/product/product.controller.js
 * Controller xử lý request/response — gọi product.service
 */
import slugify from 'slugify'
import {
  findProducts,
  findProductById,
  findProductBySlug,
  findRelatedProducts,
  findFeaturedProducts,
  findFlashSaleProducts,
  searchProducts as searchProductsService,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from './product.service.js'

import { successResponse, paginatedResponse, errorResponse } from '../../core/utils/response.js'

// ================================
// HELPERS
// ================================
function generateSlug(name) {
  return slugify(name, { lower: true, strict: true, locale: 'vi' })
}

// ================================
// GET /api/products
// ================================
export async function getProducts(req, res, next) {
  try {
    const {
      page     = 1,
      limit    = 12,
      q,
      brand,
      category,
      excludeCategory,
      status,
      minPrice,
      maxPrice,
      sort     = 'createdAt',
      order    = 'desc',
    } = req.query

    const result = await findProducts({
      page, limit, q, brand, category, excludeCategory, status, minPrice, maxPrice, sort, order,
    })

    return paginatedResponse(res, result.data, result.pagination)
  } catch (err) {
    next(err)
  }
}

// ================================
// GET /api/products/featured
// ================================
export async function getFeaturedProducts(req, res, next) {
  try {
    const { category, limit = 8 } = req.query
    const data = await findFeaturedProducts({ category, limit })
    return successResponse(res, data)
  } catch (err) {
    next(err)
  }
}

// ================================
// GET /api/products/flash-sale
// ================================
export async function getFlashSaleProducts(req, res, next) {
  try {
    const { limit = 8 } = req.query
    const data = await findFlashSaleProducts({ limit })
    return successResponse(res, data)
  } catch (err) {
    next(err)
  }
}

// ================================
// GET /api/products/search
// ================================
export async function searchProducts(req, res, next) {
  try {
    const { q, limit = 20 } = req.query
    const data = await searchProductsService({ q, limit })
    return successResponse(res, data)
  } catch (err) {
    next(err)
  }
}

// ================================
// GET /api/products/slug/:slug
// ================================
export async function getProductBySlug(req, res, next) {
  try {
    const { slug } = req.params
    const product = await findProductBySlug(slug)
    if (!product) return errorResponse(res, 'Không tìm thấy sản phẩm', 404)
    return successResponse(res, product)
  } catch (err) {
    next(err)
  }
}

// ================================
// GET /api/products/:id
// ================================
export async function getProductById(req, res, next) {
  try {
    const { id } = req.params
    const product = await findProductById(id)
    if (!product) return errorResponse(res, 'Không tìm thấy sản phẩm', 404)
    return successResponse(res, product)
  } catch (err) {
    next(err)
  }
}

// ================================
// GET /api/products/:id/related
// ================================
export async function getRelatedProducts(req, res, next) {
  try {
    const { id }  = req.params
    const limit   = Number(req.query.limit) || 6
    const related = await findRelatedProducts(id, limit)
    return successResponse(res, related)
  } catch (err) {
    next(err)
  }
}

// ================================
// POST /api/products
// ================================
export async function createProduct(req, res, next) {
  try {
    const {
      name, description, brand, brandName, category,
      price, originalPrice, stock = 0, image, thumbnail,
      images = [], rating = 0, sold = 0, status = 'active',
      isNew = false, isBestseller = false, isFlashSale = false,
      isFeatured = false, slug: customSlug,
    } = req.body

    const slug = customSlug || generateSlug(name)

    const existing = await findProductBySlug(slug)
    if (existing) {
      return errorResponse(res, `Slug "${slug}" đã tồn tại. Vui lòng chọn tên khác.`, 409)
    }

    const product = await createProductService({
      name, slug, description, brand,
      brandName:    brandName || brand,
      category,
      price:        Number(price),
      originalPrice: Number(originalPrice),
      stock:        Number(stock),
      image, thumbnail, images,
      rating:       Number(rating),
      sold:         Number(sold),
      status, isNew, isBestseller, isFlashSale, isFeatured,
    })

    return successResponse(res, product, 'Tạo sản phẩm thành công', 201)
  } catch (err) {
    next(err)
  }
}

// ================================
// PUT /api/products/:id
// ================================
export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params
    const existing = await findProductById(id)
    if (!existing) return errorResponse(res, 'Không tìm thấy sản phẩm', 404)

    const updateData = { ...req.body }
    if (updateData.name && updateData.name !== existing.name && !updateData.slug) {
      updateData.slug = generateSlug(updateData.name)
    }

    if (updateData.price)         updateData.price         = Number(updateData.price)
    if (updateData.originalPrice) updateData.originalPrice = Number(updateData.originalPrice)
    if (updateData.stock)         updateData.stock         = Number(updateData.stock)

    delete updateData.id
    delete updateData.createdAt

    const product = await updateProductService(id, updateData)
    return successResponse(res, product, 'Cập nhật sản phẩm thành công')
  } catch (err) {
    if (err.code === 'P2002') return errorResponse(res, 'Slug đã tồn tại', 409)
    next(err)
  }
}

// ================================
// DELETE /api/products/:id
// ================================
export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params
    const existing = await findProductById(id)
    if (!existing) return errorResponse(res, 'Không tìm thấy sản phẩm', 404)

    await deleteProductService(id)
    return successResponse(res, null, 'Xóa sản phẩm thành công')
  } catch (err) {
    next(err)
  }
}
