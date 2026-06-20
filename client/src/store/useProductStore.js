/**
 * store/useProductStore.js
 * Zustand store quản lý trạng thái danh sách sản phẩm
 */
import { create } from 'zustand'

const useProductStore = create((set, get) => ({
  // ================================
  // STATE
  // ================================
  products: [],
  loading: false,
  error: null,
  totalPages: 1,
  total: 0,
  currentPage: 1,

  // Bộ lọc
  filters: {
    brands: [],
    priceMin: undefined,
    priceMax: undefined,
    rams: [],
    storages: [],
    search: '',
  },

  // Sắp xếp
  sort: 'default',

  // ================================
  // ACTIONS
  // ================================

  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setPage: (page) => set({ currentPage: page }),
  setPagination: ({ totalPages, total }) => set({ totalPages, total }),

  // Cập nhật filter
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value },
    currentPage: 1, // Reset về trang 1 khi filter thay đổi
  })),

  // Reset toàn bộ filter
  resetFilters: () => set({
    filters: { brands: [], priceMin: undefined, priceMax: undefined, rams: [], storages: [], search: '' },
    sort: 'default',
    currentPage: 1,
  }),

  // Cập nhật sort
  setSort: (sort) => set({ sort, currentPage: 1 }),

  // Toggle brand trong filter
  toggleBrand: (brand) => set((state) => {
    const brands = state.filters.brands.includes(brand)
      ? state.filters.brands.filter(b => b !== brand)
      : [...state.filters.brands, brand]
    return { filters: { ...state.filters, brands }, currentPage: 1 }
  }),

  // Toggle RAM
  toggleRam: (ram) => set((state) => {
    const rams = state.filters.rams.includes(ram)
      ? state.filters.rams.filter(r => r !== ram)
      : [...state.filters.rams, ram]
    return { filters: { ...state.filters, rams }, currentPage: 1 }
  }),

  // Toggle storage
  toggleStorage: (storage) => set((state) => {
    const storages = state.filters.storages.includes(storage)
      ? state.filters.storages.filter(s => s !== storage)
      : [...state.filters.storages, storage]
    return { filters: { ...state.filters, storages }, currentPage: 1 }
  }),
}))

export default useProductStore
