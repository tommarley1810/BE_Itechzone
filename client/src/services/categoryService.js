/**
 * services/categoryService.js
 * Service xử lý danh mục sản phẩm
 */
import { CATEGORIES, PHONE_BRANDS, TABLET_BRANDS } from '@/constants'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export async function getCategories() {
  await delay(200)
  return CATEGORIES
}

export async function getBrands(category) {
  await delay(100)
  if (category === 'dien-thoai') return PHONE_BRANDS
  if (category === 'may-tinh-bang') return TABLET_BRANDS
  return [...PHONE_BRANDS, ...TABLET_BRANDS]
}
