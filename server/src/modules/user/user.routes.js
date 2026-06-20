/**
 * src/modules/user/user.routes.js
 */
import { Router } from 'express'
import { protect } from '../../core/middlewares/auth.middleware.js'
import {
  getProfileController,
  updateProfileController,
  changePasswordController,
  saveAddressController,
  removeAddressController,
} from './user.controller.js'

const router = Router()

// Tất cả user routes đều cần đăng nhập
router.use(protect)

// GET  /api/users/profile
router.get('/profile', getProfileController)

// PUT  /api/users/profile
router.put('/profile', updateProfileController)

// PUT  /api/users/password
router.put('/password', changePasswordController)

// POST /api/users/addresses
router.post('/addresses', saveAddressController)

// DELETE /api/users/addresses/:id
router.delete('/addresses/:id', removeAddressController)

export default router
