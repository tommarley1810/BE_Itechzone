/**
 * src/modules/product/product.service.js
 * Business logic — gọi repository, không chứa logic DB
 */
import {
  findProducts,
  findProductById,
  findProductBySlug,
  findRelatedProducts,
  findFeaturedProducts,
  findFlashSaleProducts,
  searchProductsRepo,
  createProductRepo,
  updateProductRepo,
  deleteProductRepo,
} from './product.repository.js'

export {
  findProducts,
  findProductById,
  findProductBySlug,
  findRelatedProducts,
  findFeaturedProducts,
  findFlashSaleProducts,
}

export async function searchProducts({ q, limit }) {
  return searchProductsRepo({ q, limit })
}

export async function createProduct(data) {
  return createProductRepo(data)
}

export async function updateProduct(id, data) {
  return updateProductRepo(id, data)
}

export async function deleteProduct(id) {
  return deleteProductRepo(id)
}
