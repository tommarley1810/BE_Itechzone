/**
 * src/modules/order/order.controller.js
 */
import { placeOrder, getMyOrders, getOrderDetail, cancelMyOrder } from './order.service.js'
import { successResponse } from '../../core/utils/response.js'

export async function placeOrderController(req, res, next) {
  try {
    const order = await placeOrder(req.user.id, req.body)
    return successResponse(res, order, 'Đặt hàng thành công', 201)
  } catch (err) { next(err) }
}

export async function getMyOrdersController(req, res, next) {
  try {
    const orders = await getMyOrders(req.user.id)
    return successResponse(res, orders)
  } catch (err) { next(err) }
}

export async function getOrderDetailController(req, res, next) {
  try {
    const order = await getOrderDetail(req.params.id, req.user.id)
    return successResponse(res, order)
  } catch (err) { next(err) }
}

export async function cancelOrderController(req, res, next) {
  try {
    const order = await cancelMyOrder(req.params.id, req.user.id)
    return successResponse(res, order, 'Huỷ đơn hàng thành công')
  } catch (err) { next(err) }
}
