/**
 * src/modules/auth/auth.schema.js
 * Validation rules cho auth module
 */
import { body } from 'express-validator'

export const registerRules = [
  body('name')
    .trim().notEmpty().withMessage('Tên không được bỏ trống')
    .isLength({ min: 2 }).withMessage('Tên phải có ít nhất 2 ký tự'),
  body('email')
    .trim().notEmpty().withMessage('Email không được bỏ trống')
    .isEmail().withMessage('Email không hợp lệ')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Mật khẩu không được bỏ trống')
    .isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
  body('phone')
    .optional()
    .matches(/^0\d{9}$/).withMessage('Số điện thoại phải là 10 chữ số, bắt đầu bằng 0'),
]

export const loginRules = [
  body('email')
    .trim().notEmpty().withMessage('Email không được bỏ trống')
    .isEmail().withMessage('Email không hợp lệ')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Mật khẩu không được bỏ trống'),
]
