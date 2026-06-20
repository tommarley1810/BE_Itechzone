/**
 * src/modules/cart/cart.service.js
 */
import prisma from '../../configs/database.js'
import {
  getCartByUser, findCartItem, upsertCartItem,
  updateCartItemQty, removeCartItem, clearCart,
} from './cart.repository.js'

export async function getCart(userId) {
  const items = await getCartByUser(userId)
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  return { items, total, count: items.length }
}

export async function addToCart(userId, productId, quantity = 1, variant = null) {
  // Kiểm tra sản phẩm tồn tại và còn hàng
  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product || product.status !== 'active') {
    const err = new Error('Sản phẩm không tồn tại hoặc ngừng bán')
    err.statusCode = 404
    throw err
  }
  if (product.stock < quantity) {
    const err = new Error(`Sản phẩm chỉ còn ${product.stock} trong kho`)
    err.statusCode = 400
    throw err
  }

  // Nếu đã có trong giỏ thì cộng thêm số lượng
  const existing = await findCartItem(userId, productId)
  const newQty = existing ? existing.quantity + quantity : quantity

  await upsertCartItem(userId, productId, newQty, variant)
  return getCart(userId)
}

export async function updateItem(userId, itemId, quantity) {
  if (quantity < 1) {
    const err = new Error('Số lượng phải lớn hơn 0')
    err.statusCode = 400
    throw err
  }
  await updateCartItemQty(itemId, userId, quantity)
  return getCart(userId)
}

export async function removeItem(userId, itemId) {
  await removeCartItem(itemId, userId)
  return getCart(userId)
}

export async function clearUserCart(userId) {
  await clearCart(userId)
  return { items: [], total: 0, count: 0 }
}
