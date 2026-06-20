/**
 * src/modules/admin/admin.middleware.js
 * Middleware kiểm tra quyền admin / staff
 */
import { protect } from '../../core/middlewares/auth.middleware.js'

/** Chỉ admin */
export function requireAdmin(req, res, next) {
  protect(req, res, () => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Yêu cầu quyền Admin' })
    }
    next()
  })
}

/** Admin hoặc staff */
export function requireStaff(req, res, next) {
  protect(req, res, () => {
    if (!['admin', 'staff'].includes(req.user?.role)) {
      return res.status(403).json({ success: false, message: 'Yêu cầu quyền nhân viên hoặc Admin' })
    }
    next()
  })
}
