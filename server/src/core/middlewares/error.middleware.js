/**
 * src/core/middlewares/error.middleware.js
 * Middleware xử lý lỗi tập trung
 */

/**
 * 404 Not Found handler
 */
export function notFound(req, res, next) {
  const err = new Error(`Route không tồn tại: ${req.originalUrl}`)
  err.statusCode = 404
  next(err)
}

/**
 * Global error handler
 */
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500

  // Log lỗi trong development
  if (process.env.NODE_ENV === 'development') {
    console.error(`[ERROR] ${statusCode} - ${err.message}`)
    if (err.stack) console.error(err.stack)
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Lỗi máy chủ nội bộ',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
