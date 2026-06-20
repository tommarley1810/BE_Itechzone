/**
 * store/useThemeStore.js
 * Zustand store quản lý Dark/Light mode
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/constants'

const useThemeStore = create(
  persist(
    (set, get) => ({
      // State: 'light' | 'dark'
      theme: 'dark',

      // Toggle dark/light
      toggleTheme: () => {
        const newTheme = get().theme === 'dark' ? 'light' : 'dark'
        set({ theme: newTheme })
        // Apply class vào <html>
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
      },

      // Set theme cụ thể
      setTheme: (theme) => {
        set({ theme })
        document.documentElement.classList.toggle('dark', theme === 'dark')
      },

      // Khởi tạo theme khi app load
      initTheme: () => {
        const { theme } = get()
        document.documentElement.classList.toggle('dark', theme === 'dark')
      },
    }),
    {
      name: STORAGE_KEYS.THEME,
      // Chỉ lưu trường theme
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)

export default useThemeStore
