/**
 * src/modules/review/review.routes.js
 * Mounted tại /api/products/:productId/reviews và /api/reviews
 */
import { Router } from 'express'
import { protect }              from '../../core/middlewares/auth.middleware.js'
import {
  getReviewsController,
  createReviewController,
  deleteReviewController,
} from './review.controller.js'

// Router cho /api/products/:productId/reviews
export const productReviewRouter = Router({ mergeParams: true })
productReviewRouter.get('/',   getReviewsController)
productReviewRouter.post('/',  protect, createReviewController)

// Router cho /api/reviews
export const reviewRouter = Router()
reviewRouter.delete('/:id', protect, deleteReviewController)
