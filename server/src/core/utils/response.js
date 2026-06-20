/**
 * src/core/utils/response.js
 * Helpers chuẩn hoá response API
 */

export function successResponse(res, data, message = 'Thành công', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  })
}

export function paginatedResponse(res, data, pagination, message = 'Thành công') {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination,
  })
}

export function errorResponse(res, message = 'Lỗi máy chủ', statusCode = 500) {
  return res.status(statusCode).json({
    success: false,
    message,
  })
}
