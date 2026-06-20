/**
 * src/modules/product/product.schema.js
 * Validation rules (express-validator) cho product module
 */
import { body } from 'express-validator'

export const createProductRules = [
  body('name')
    .trim().notEmpty().withMessage('Tên sản phẩm không được bỏ trống')
    .isLength({ min: 3 }).withMessage('Tên sản phẩm phải có ít nhất 3 ký tự'),
  body('brand')
    .trim().notEmpty().withMessage('Brand không được bỏ trống'),
  body('category')
    .trim().notEmpty().withMessage('Category không được bỏ trống'),
  body('price')
    .isInt({ min: 0 }).withMessage('Giá phải là số nguyên dương'),
  body('originalPrice')
    .isInt({ min: 0 }).withMessage('Giá gốc phải là số nguyên dương'),
  body('stock')
    .optional().isInt({ min: 0 }).withMessage('Stock phải là số nguyên không âm'),
]

export const updateProductRules = [
  body('name')
    .optional().trim()
    .isLength({ min: 3 }).withMessage('Tên sản phẩm phải có ít nhất 3 ký tự'),
  body('price')
    .optional().isInt({ min: 0 }).withMessage('Giá phải là số nguyên dương'),
  body('originalPrice')
    .optional().isInt({ min: 0 }).withMessage('Giá gốc phải là số nguyên dương'),
  body('stock')
    .optional().isInt({ min: 0 }).withMessage('Stock phải là số nguyên không âm'),
  body('status')
    .optional().isIn(['active', 'inactive', 'out_of_stock']).withMessage('Status không hợp lệ'),
]
