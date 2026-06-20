/**
 * src/core/errors/AppError.js
 * Custom Error class — tạo lỗi có statusCode chuẩn
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Không tìm thấy tài nguyên') {
    super(message, 404)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Chưa xác thực. Vui lòng đăng nhập.') {
    super(message, 401)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Không có quyền truy cập.') {
    super(message, 403)
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Dữ liệu không hợp lệ') {
    super(message, 422)
  }
}
