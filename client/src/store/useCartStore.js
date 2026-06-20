/**
 * store/useCartStore.js
 * Zustand store quản lý giỏ hàng
 * Tự động persist vào localStorage
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/constants'

const useCartStore = create(
  persist(
    (set, get) => ({
      // ================================
      // STATE
      // ================================
      items: [],           // Danh sách sản phẩm trong giỏ
      isDrawerOpen: false, // Trạng thái mở/đóng Cart Drawer

      // ================================
      // GETTERS
      // ================================

      // Tổng số lượng sản phẩm
      get totalItems() {
        return get().items.reduce((sum, item) => sum + item.qty, 0)
      },

      // Tổng tiền
      get totalPrice() {
        return get().items.reduce((sum, item) => sum + item.price * item.qty, 0)
      },

      // Kiểm tra sản phẩm đã có trong giỏ chưa
      isInCart: (productId) => {
        return get().items.some(item => item.id === productId)
      },

      // Lấy số lượng của 1 sản phẩm
      getItemQty: (productId) => {
        const item = get().items.find(i => i.id === productId)
        return item?.qty || 0
      },

      // ================================
      // ACTIONS
      // ================================

      /**
       * Thêm sản phẩm vào giỏ
       * @param {Object} product - Sản phẩm cần thêm
       * @param {number} qty - Số lượng (mặc định 1)
       */
      addItem: (product, qty = 1) => {
        set((state) => {
          const existing = state.items.find(i => i.id === product.id)

          if (existing) {
            // Tăng số lượng nếu đã có
            return {
              items: state.items.map(i =>
                i.id === product.id
                  ? { ...i, qty: Math.min(i.qty + qty, i.stock || 99) }
                  : i
              ),
            }
          }

          // Thêm mới
          return {
            items: [...state.items, {
              id: product.id,
              slug: product.slug,
              name: product.name,
              brand: product.brandName,
              price: product.price,
              thumbnail: product.thumbnail,
              stock: product.stock || 99,
              qty,
            }],
          }
        })
      },

      /**
       * Xóa sản phẩm khỏi giỏ
       */
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(i => i.id !== productId),
        }))
      },

      /**
       * Cập nhật số lượng
       */
      updateQty: (productId, qty) => {
        if (qty <= 0) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map(i =>
            i.id === productId
              ? { ...i, qty: Math.min(qty, i.stock || 99) }
              : i
          ),
        }))
      },

      /**
       * Xóa toàn bộ giỏ hàng
       */
      clearCart: () => set({ items: [] }),

      /**
       * Set toàn bộ items (dùng khi khôi phục cart từ server sau login)
       */
      setItems: (items) => set({ items }),

      /**
       * Mở/đóng Cart Drawer
       */
      openDrawer:  () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    }),
    {
      name: STORAGE_KEYS.CART,
      // Chỉ persist items, không persist isDrawerOpen
      partialize: (state) => ({ items: state.items }),
    }
  )
)

export default useCartStore
