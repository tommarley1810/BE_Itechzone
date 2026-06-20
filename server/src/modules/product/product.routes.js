/**
 * src/modules/product/product.routes.js
 * Routes cho product module
 */
import { Router } from 'express'
import { handleValidation } from '../../core/middlewares/validate.middleware.js'
import { createProductRules, updateProductRules } from './product.schema.js'
import {
  getProducts,
  getProductById,
  getProductBySlug,
  getRelatedProducts,
  getFeaturedProducts,
  getFlashSaleProducts,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from './product.controller.js'

const router = Router()

// ================================
// ROUTES — Thứ tự quan trọng: static routes trước dynamic
// ================================

// GET /api/products?page=&limit=&q=&brand=&category=&sort=&order=&minPrice=&maxPrice=
router.get('/', getProducts)

// GET /api/products/featured?category=&limit=
router.get('/featured', getFeaturedProducts)

// GET /api/products/flash-sale?limit=
router.get('/flash-sale', getFlashSaleProducts)

// GET /api/products/search?q=&limit=
router.get('/search', searchProducts)

// GET /api/products/slug/:slug
router.get('/slug/:slug', getProductBySlug)

// POST /api/products
router.post('/', createProductRules, handleValidation, createProduct)

// GET /api/products/:id
router.get('/:id', getProductById)

// GET /api/products/:id/related?limit=
router.get('/:id/related', getRelatedProducts)

// PUT /api/products/:id
router.put('/:id', updateProductRules, handleValidation, updateProduct)

// DELETE /api/products/:id
router.delete('/:id', deleteProduct)

export default router
