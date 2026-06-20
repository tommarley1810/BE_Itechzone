/**
 * store/useAdminStore.js — Zustand store cho admin panel
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { adminLogin as loginApi } from '@/services/adminService'

const useAdminStore = create(
  persist(
    (set) => ({
      admin: null,
      token: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const res = await loginApi(email, password)
          const { user, token } = res.data
          localStorage.setItem('itechzone_admin_token', token)
          set({ admin: user, token, isLoading: false })
          return { success: true, role: user.role }
        } catch (err) {
          set({ isLoading: false })
          return { success: false, error: err.message }
        }
      },

      logout: () => {
        localStorage.removeItem('itechzone_admin_token')
        set({ admin: null, token: null })
      },

      // Dùng khi admin/staff đăng nhập qua trang customer login
      setAdminFromAuth: (user, token) => {
        set({ admin: user, token })
      },
    }),
    {
      name: 'itechzone_admin',
      partialize: (s) => ({ admin: s.admin, token: s.token }),
    }
  )
)

export default useAdminStore
