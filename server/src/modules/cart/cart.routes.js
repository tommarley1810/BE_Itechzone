/**
 * src/modules/cart/cart.routes.js
 */
import { Router } from 'express'
import { protect } from '../../core/middlewares/auth.middleware.js'
import {
  getCartController,
  addToCartController,
  updateItemController,
  removeItemController,
  clearCartController,
} from './cart.controller.js'

const router = Router()
router.use(protect)

// GET    /api/cart
router.get('/',        getCartController)
// POST   /api/cart
router.post('/',       addToCartController)
// PUT    /api/cart/:id
router.put('/:id',     updateItemController)
// DELETE /api/cart (clear all)
router.delete('/',     clearCartController)
// DELETE /api/cart/:id (remove one)
router.delete('/:id',  removeItemController)

export default router
