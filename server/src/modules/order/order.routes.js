/**
 * src/modules/order/order.routes.js
 */
import { Router } from 'express'
import { protect } from '../../core/middlewares/auth.middleware.js'
import {
  placeOrderController,
  getMyOrdersController,
  getOrderDetailController,
  cancelOrderController,
} from './order.controller.js'

const router = Router()
router.use(protect)

// POST   /api/orders        — đặt hàng từ giỏ hàng
router.post('/',                    placeOrderController)
// GET    /api/orders        — lịch sử đơn hàng
router.get('/',                     getMyOrdersController)
// GET    /api/orders/:id    — chi tiết đơn hàng
router.get('/:id',                  getOrderDetailController)
// PUT    /api/orders/:id/cancel — huỷ đơn
router.put('/:id/cancel',           cancelOrderController)

export default router
