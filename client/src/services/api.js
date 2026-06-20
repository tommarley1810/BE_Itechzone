/**
 * services/api.js
 * Axios instance trung tâm — tất cả request đều đi qua đây
 *
 * Cách sử dụng:
 *   import api from '@/services/api'
 *   const res = await api.get('/products')
 *
 * Khi kết nối backend thật:
 *   Chỉ cần đổi VITE_API_URL trong file .env
 */

import axios from 'axios'
import { STORAGE_KEYS } from '@/constants'

// ================================
// BASE URL — đọc từ biến môi trường
// ================================
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ================================
// TẠO AXIOS INSTANCE
// ================================
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // 15 giây timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// ================================
// REQUEST INTERCEPTOR
// Tự động đính kèm token vào mỗi request
// ================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ================================
// RESPONSE INTERCEPTOR
// Xử lý lỗi tập trung
// ================================
api.interceptors.response.use(
  (response) => response.data, // Trả về data trực tiếp
  (error) => {
    const status = error.response?.status
    const message = error.response?.data?.message || 'Đã xảy ra lỗi'

    // Token hết hạn → logout
    if (status === 401) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER)
      // Redirect về login nếu cần
      if (window.location.pathname !== '/dang-nhap') {
        window.location.href = '/dang-nhap'
      }
    }

    // Tạo error object chuẩn
    const customError = new Error(message)
    customError.status = status
    customError.data = error.response?.data

    return Promise.reject(customError)
  }
)

export default api
