/**
 * utils/format.js
 * Các hàm tiện ích định dạng dữ liệu cho ITechZone
 */

/**
 * Định dạng giá tiền VNĐ
 * @param {number} price - Giá tiền
 * @param {boolean} compact - Rút gọn (vd: 10 triệu)
 * @returns {string}
 */
export function formatPrice(price, compact = false) {
  if (!price && price !== 0) return '0₫'

  if (compact) {
    if (price >= 1_000_000_000) {
      return `${(price / 1_000_000_000).toFixed(1)} tỷ₫`
    }
    if (price >= 1_000_000) {
      return `${(price / 1_000_000).toFixed(0)} triệu₫`
    }
    if (price >= 1_000) {
      return `${(price / 1_000).toFixed(0)}K₫`
    }
  }

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Tính % giảm giá
 * @param {number} originalPrice
 * @param {number} salePrice
 * @returns {number}
 */
export function calcDiscount(originalPrice, salePrice) {
  if (!originalPrice || originalPrice <= salePrice) return 0
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

/**
 * Định dạng số lượng đã bán (vd: 1.2K, 10K)
 * @param {number} count
 * @returns {string}
 */
export function formatSoldCount(count) {
  if (!count) return '0'
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`
  return count.toString()
}

/**
 * Rút gọn tên sản phẩm
 * @param {string} name
 * @param {number} maxLength
 * @returns {string}
 */
export function truncateText(name, maxLength = 50) {
  if (!name) return ''
  if (name.length <= maxLength) return name
  return name.substring(0, maxLength).trim() + '...'
}

/**
 * Định dạng ngày giờ
 * @param {string|Date} date
 * @param {string} format - 'short' | 'long' | 'relative'
 * @returns {string}
 */
export function formatDate(date, format = 'short') {
  if (!date) return ''
  const d = new Date(date)

  if (format === 'relative') {
    const diff = Date.now() - d.getTime()
    const minutes = Math.floor(diff / 60_000)
    const hours = Math.floor(diff / 3_600_000)
    const days = Math.floor(diff / 86_400_000)

    if (minutes < 1) return 'Vừa xong'
    if (minutes < 60) return `${minutes} phút trước`
    if (hours < 24) return `${hours} giờ trước`
    if (days < 7) return `${days} ngày trước`
  }

  if (format === 'long') {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    }).format(d)
  }

  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(d)
}

/**
 * Format số điện thoại VN
 * @param {string} phone
 * @returns {string}
 */
export function formatPhone(phone) {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
  }
  return phone
}

/**
 * Tạo slug từ text
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
  const vietnameseMap = {
    'à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ': 'a',
    'è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ': 'e',
    'ì|í|ị|ỉ|ĩ': 'i',
    'ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ': 'o',
    'ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ': 'u',
    'ỳ|ý|ỵ|ỷ|ỹ': 'y',
    'đ': 'd',
  }

  let str = text.toLowerCase()
  for (const [pattern, replacement] of Object.entries(vietnameseMap)) {
    str = str.replace(new RegExp(pattern, 'g'), replacement)
  }

  return str
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Kiểm tra email hợp lệ
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Kiểm tra SĐT VN hợp lệ
 */
export function isValidPhone(phone) {
  return /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-9]|9[0-9])[0-9]{7}$/.test(phone)
}
