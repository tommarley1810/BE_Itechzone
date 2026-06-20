/**
 * src/core/middlewares/validate.middleware.js
 * Middleware validation dùng express-validator
 */
import { validationResult } from 'express-validator'

/**
 * Chạy sau các validators — nếu có lỗi thì return 422
 */
export function handleValidation(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Dữ liệu không hợp lệ',
      errors:  errors.array().map(e => ({ field: e.path, message: e.msg })),
    })
  }
  next()
}
