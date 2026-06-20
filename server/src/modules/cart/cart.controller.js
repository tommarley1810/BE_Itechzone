/**
 * src/modules/cart/cart.controller.js
 */
import { getCart, addToCart, updateItem, removeItem, clearUserCart } from './cart.service.js'
import { successResponse } from '../../core/utils/response.js'

export async function getCartController(req, res, next) {
  try {
    const cart = await getCart(req.user.id)
    return successResponse(res, cart)
  } catch (err) { next(err) }
}

export async function addToCartController(req, res, next) {
  try {
    const { productId, quantity = 1, variant } = req.body
    if (!productId) return res.status(400).json({ success: false, message: 'productId là bắt buộc' })
    const cart = await addToCart(req.user.id, productId, Number(quantity), variant)
    return successResponse(res, cart, 'Thêm vào giỏ hàng thành công')
  } catch (err) { next(err) }
}

export async function updateItemController(req, res, next) {
  try {
    const { quantity } = req.body
    const cart = await updateItem(req.user.id, req.params.id, Number(quantity))
    return successResponse(res, cart, 'Cập nhật giỏ hàng thành công')
  } catch (err) { next(err) }
}

export async function removeItemController(req, res, next) {
  try {
    const cart = await removeItem(req.user.id, req.params.id)
    return successResponse(res, cart, 'Đã xoá sản phẩm khỏi giỏ hàng')
  } catch (err) { next(err) }
}

export async function clearCartController(req, res, next) {
  try {
    const cart = await clearUserCart(req.user.id)
    return successResponse(res, cart, 'Đã xoá toàn bộ giỏ hàng')
  } catch (err) { next(err) }
}
