/**
 * prisma/seed.js
 * Seed dữ liệu cho ITechZone — 24 sản phẩm với variants (màu + dung lượng + giá)
 */
import { PrismaClient } from '@prisma/client'
import slugify from 'slugify'

const prisma = new PrismaClient()

function makeSlug(name) {
  return slugify(name, { lower: true, strict: true, locale: 'vi' })
}

// ===================================================
// HELPER — tạo variants nhanh
// ===================================================
function mkVariants(colors, storages) {
  // colors: [{ name, code }]
  // storages: [{ capacity, priceAdd, stockBase }]
  // priceAdd: số tiền cộng thêm so với giá base của màu đầu tiên
  const result = []
  for (const color of colors) {
    for (const s of storages) {
      result.push({
        color:         color.name,
        colorCode:     color.code,
        capacity:      s.capacity,
        price:         s.price,
        originalPrice: s.originalPrice,
        stock:         s.stock,
      })
    }
  }
  return result
}

const PRODUCTS = [
  // =========================================
  // ĐIỆN THOẠI — APPLE
  // =========================================
  {
    name:          'Apple iPhone 15 Pro Max 256GB',
    description:   'iPhone 15 Pro Max với chip A17 Pro đột phá, khung Titan và camera 48MP chuyên nghiệp. Màn hình Super Retina XDR 6.7 inch ProMotion 120Hz, pin 4422mAh cùng cổng USB-C thế hệ mới.',
    brand:         'apple',
    brandName:     'Apple',
    category:      'dien-thoai',
    price:         34990000,
    originalPrice: 37990000,
    stock:         50,
    image:         'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop',
    thumbnail:     'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
    images:        ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&h=600&fit=crop'],
    rating:        4.9, sold: 15200,
    isNew: true, isBestseller: true, isFlashSale: false, isFeatured: true,
    variants: mkVariants(
      [{ name: 'Titan Đen',     code: '#3d3935' },
       { name: 'Titan Trắng',   code: '#f5f5ed' },
       { name: 'Titan Xanh',    code: '#4a5f6e' },
       { name: 'Titan Tự nhiên',code: '#c8b99a' }],
      [{ capacity: '256GB',  price: 34990000, originalPrice: 37990000, stock: 15 },
       { capacity: '512GB',  price: 40990000, originalPrice: 43990000, stock: 10 },
       { capacity: '1TB',    price: 52990000, originalPrice: 55990000, stock: 5  }]
    ),
  },
  {
    name:          'Apple iPhone 15 Pro 128GB',
    description:   'iPhone 15 Pro chip A17 Pro, khung Titan, camera 48MP, màn hình 6.1 inch Super Retina XDR ProMotion 120Hz.',
    brand:         'apple', brandName: 'Apple', category: 'dien-thoai',
    price: 27990000, originalPrice: 29990000, stock: 45,
    image:     'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop'],
    rating: 4.8, sold: 12300,
    isNew: true, isBestseller: true, isFlashSale: true, isFeatured: true,
    variants: mkVariants(
      [{ name: 'Titan Đen',   code: '#3d3935' },
       { name: 'Titan Trắng', code: '#f5f5ed' },
       { name: 'Titan Xanh',  code: '#4a5f6e' }],
      [{ capacity: '128GB', price: 27990000, originalPrice: 29990000, stock: 15 },
       { capacity: '256GB', price: 31990000, originalPrice: 33990000, stock: 15 },
       { capacity: '512GB', price: 37990000, originalPrice: 39990000, stock: 8  }]
    ),
  },
  {
    name:          'Apple iPhone 14 256GB',
    description:   'iPhone 14 chip A15 Bionic, camera 12MP Dual, màn hình Super Retina XDR 6.1 inch, Face ID.',
    brand:         'apple', brandName: 'Apple', category: 'dien-thoai',
    price: 19990000, originalPrice: 22990000, stock: 30,
    image:     'https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?w=600&h=600&fit=crop'],
    rating: 4.7, sold: 9800,
    isNew: false, isBestseller: true, isFlashSale: true, isFeatured: false,
    variants: mkVariants(
      [{ name: 'Đen',  code: '#1c1c1e' },
       { name: 'Tím',  code: '#7b6d8d' },
       { name: 'Xanh', code: '#2a4d69' },
       { name: 'Đỏ',   code: '#c0392b' }],
      [{ capacity: '128GB', price: 17990000, originalPrice: 20990000, stock: 12 },
       { capacity: '256GB', price: 19990000, originalPrice: 22990000, stock: 10 },
       { capacity: '512GB', price: 24990000, originalPrice: 27990000, stock: 5  }]
    ),
  },
  {
    name:          'Apple iPhone 13 128GB',
    description:   'iPhone 13 chip A15 Bionic, camera Dual 12MP, màn hình Super Retina XDR 6.1 inch, pin 3227mAh.',
    brand:         'apple', brandName: 'Apple', category: 'dien-thoai',
    price: 15990000, originalPrice: 17990000, stock: 25,
    image:     'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600&h=600&fit=crop'],
    rating: 4.6, sold: 14500,
    isNew: false, isBestseller: true, isFlashSale: false, isFeatured: false,
    variants: mkVariants(
      [{ name: 'Đen',     code: '#1c1c1e' },
       { name: 'Trắng',   code: '#f5f5f0' },
       { name: 'Đỏ',      code: '#c0392b' },
       { name: 'Xanh lá', code: '#2e7d32' }],
      [{ capacity: '128GB', price: 15990000, originalPrice: 17990000, stock: 10 },
       { capacity: '256GB', price: 18490000, originalPrice: 20490000, stock: 8  },
       { capacity: '512GB', price: 22990000, originalPrice: 24990000, stock: 4  }]
    ),
  },

  // =========================================
  // ĐIỆN THOẠI — SAMSUNG
  // =========================================
  {
    name:          'Samsung Galaxy S24 Ultra 512GB',
    description:   'Galaxy S24 Ultra Snapdragon 8 Gen 3, bút S Pen tích hợp, camera 200MP, màn hình Dynamic AMOLED 2X 6.8 inch 120Hz, Galaxy AI.',
    brand:         'samsung', brandName: 'Samsung', category: 'dien-thoai',
    price: 31990000, originalPrice: 34990000, stock: 40,
    image:     'https://images.unsplash.com/photo-1706041473788-d0f879f80b21?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1706041473788-d0f879f80b21?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1706041473788-d0f879f80b21?w=600&h=600&fit=crop'],
    rating: 4.8, sold: 11500,
    isNew: true, isBestseller: true, isFlashSale: false, isFeatured: true,
    variants: mkVariants(
      [{ name: 'Titan Đen',  code: '#1a1a1a' },
       { name: 'Titan Xám',  code: '#8d8d8d' },
       { name: 'Titan Tím',  code: '#6b4d7d' }],
      [{ capacity: '256GB', price: 28990000, originalPrice: 31990000, stock: 12 },
       { capacity: '512GB', price: 31990000, originalPrice: 34990000, stock: 10 },
       { capacity: '1TB',   price: 38990000, originalPrice: 41990000, stock: 5  }]
    ),
  },
  {
    name:          'Samsung Galaxy S24+ 256GB',
    description:   'Galaxy S24+ Snapdragon 8 Gen 3, màn hình Dynamic AMOLED 2X 6.7 inch 120Hz, camera 50MP, Galaxy AI.',
    brand:         'samsung', brandName: 'Samsung', category: 'dien-thoai',
    price: 24990000, originalPrice: 26990000, stock: 35,
    image:     'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop'],
    rating: 4.7, sold: 8700,
    isNew: true, isBestseller: false, isFlashSale: true, isFeatured: true,
    variants: mkVariants(
      [{ name: 'Đen Onyx',    code: '#1a1a2e' },
       { name: 'Tím Cobalt',  code: '#5c6bc0' },
       { name: 'Vàng Amber',  code: '#d4a017' }],
      [{ capacity: '256GB', price: 24990000, originalPrice: 26990000, stock: 12 },
       { capacity: '512GB', price: 28990000, originalPrice: 30990000, stock: 8  }]
    ),
  },
  {
    name:          'Samsung Galaxy S24 128GB',
    description:   'Galaxy S24 Exynos 2400, màn hình Dynamic AMOLED 2X 6.2 inch 120Hz, camera 50MP, Galaxy AI.',
    brand:         'samsung', brandName: 'Samsung', category: 'dien-thoai',
    price: 19990000, originalPrice: 21990000, stock: 55,
    image:     'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop'],
    rating: 4.6, sold: 7500,
    isNew: true, isBestseller: false, isFlashSale: false, isFeatured: true,
    variants: mkVariants(
      [{ name: 'Đen Onyx',  code: '#1a1a2e' },
       { name: 'Xám Marble',code: '#9e9e9e' },
       { name: 'Tím',       code: '#9c27b0' },
       { name: 'Vàng',      code: '#f9a825' }],
      [{ capacity: '128GB', price: 19990000, originalPrice: 21990000, stock: 15 },
       { capacity: '256GB', price: 22990000, originalPrice: 24990000, stock: 10 }]
    ),
  },
  {
    name:          'Samsung Galaxy Z Fold 5 512GB',
    description:   'Galaxy Z Fold 5 Snapdragon 8 Gen 2, màn hình gập Dynamic AMOLED 2X 7.6 inch, camera 50MP, pin 4400mAh.',
    brand:         'samsung', brandName: 'Samsung', category: 'dien-thoai',
    price: 39990000, originalPrice: 43990000, stock: 15,
    image:     'https://images.unsplash.com/photo-1631125915902-d8a3fb767e8e?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1631125915902-d8a3fb767e8e?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1631125915902-d8a3fb767e8e?w=600&h=600&fit=crop'],
    rating: 4.7, sold: 2800,
    isNew: false, isBestseller: false, isFlashSale: false, isFeatured: true,
    variants: mkVariants(
      [{ name: 'Kem',    code: '#f5f0e8' },
       { name: 'Đen',    code: '#1a1a1a' },
       { name: 'Xanh',   code: '#1565c0' }],
      [{ capacity: '256GB', price: 36990000, originalPrice: 40990000, stock: 5 },
       { capacity: '512GB', price: 39990000, originalPrice: 43990000, stock: 5 },
       { capacity: '1TB',   price: 46990000, originalPrice: 50990000, stock: 3 }]
    ),
  },

  // =========================================
  // ĐIỆN THOẠI — XIAOMI
  // =========================================
  {
    name:          'Xiaomi 14 Ultra 512GB',
    description:   'Xiaomi 14 Ultra Snapdragon 8 Gen 3, camera Leica 50MP x 4, màn hình LTPO AMOLED 6.73 inch 120Hz, pin 5000mAh sạc 90W.',
    brand:         'xiaomi', brandName: 'Xiaomi', category: 'dien-thoai',
    price: 29990000, originalPrice: 32990000, stock: 25,
    image:     'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop'],
    rating: 4.8, sold: 6200,
    isNew: true, isBestseller: false, isFlashSale: false, isFeatured: true,
    variants: mkVariants(
      [{ name: 'Trắng', code: '#f5f5f5' },
       { name: 'Đen',   code: '#1a1a1a' }],
      [{ capacity: '256GB', price: 26990000, originalPrice: 29990000, stock: 8  },
       { capacity: '512GB', price: 29990000, originalPrice: 32990000, stock: 10 },
       { capacity: '1TB',   price: 34990000, originalPrice: 37990000, stock: 5  }]
    ),
  },
  {
    name:          'Xiaomi Redmi Note 13 Pro 256GB',
    description:   'Redmi Note 13 Pro Dimensity 7200 Ultra, camera 200MP, màn hình AMOLED 6.67 inch 120Hz, sạc 67W.',
    brand:         'xiaomi', brandName: 'Xiaomi', category: 'dien-thoai',
    price: 8990000, originalPrice: 10490000, stock: 80,
    image:     'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop'],
    rating: 4.5, sold: 9200,
    isNew: false, isBestseller: false, isFlashSale: true, isFeatured: false,
    variants: mkVariants(
      [{ name: 'Đen',    code: '#1a1a1a' },
       { name: 'Trắng',  code: '#f0f0f0' },
       { name: 'Xanh',   code: '#1565c0' }],
      [{ capacity: '128GB', price: 7490000, originalPrice: 8990000,  stock: 25 },
       { capacity: '256GB', price: 8990000, originalPrice: 10490000, stock: 20 }]
    ),
  },

  // =========================================
  // ĐIỆN THOẠI — OPPO, VIVO
  // =========================================
  {
    name:          'OPPO Find X7 Ultra 512GB',
    description:   'Find X7 Ultra Dimensity 9300, camera Hasselblad 50MP, màn hình AMOLED 6.82 inch 120Hz, sạc 100W.',
    brand:         'oppo', brandName: 'OPPO', category: 'dien-thoai',
    price: 26990000, originalPrice: 29990000, stock: 20,
    image:     'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop'],
    rating: 4.6, sold: 3400,
    isNew: true, isBestseller: false, isFlashSale: false, isFeatured: false,
    variants: mkVariants(
      [{ name: 'Đen', code: '#1a1a1a' },
       { name: 'Nâu', code: '#795548' }],
      [{ capacity: '256GB', price: 23990000, originalPrice: 26990000, stock: 8 },
       { capacity: '512GB', price: 26990000, originalPrice: 29990000, stock: 8 }]
    ),
  },
  {
    name:          'Vivo X100 Pro 512GB',
    description:   'Vivo X100 Pro Dimensity 9300, camera ZEISS 50MP, màn hình AMOLED 6.78 inch 120Hz, sạc 100W.',
    brand:         'vivo', brandName: 'Vivo', category: 'dien-thoai',
    price: 24990000, originalPrice: 27990000, stock: 18,
    image:     'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop'],
    rating: 4.5, sold: 2800,
    isNew: true, isBestseller: false, isFlashSale: false, isFeatured: false,
    variants: mkVariants(
      [{ name: 'Đen', code: '#1a1a1a' },
       { name: 'Xanh',code: '#0288d1' }],
      [{ capacity: '256GB', price: 21990000, originalPrice: 24990000, stock: 6 },
       { capacity: '512GB', price: 24990000, originalPrice: 27990000, stock: 6 }]
    ),
  },

  // =========================================
  // MÁY TÍNH BẢNG — APPLE
  // =========================================
  {
    name:          'Apple iPad Pro M4 13 inch 256GB WiFi',
    description:   'iPad Pro M4 mỏng nhất từ trước tới nay, màn hình OLED 13 inch Ultra Retina XDR, chip M4 siêu mạnh, hỗ trợ Apple Pencil Pro.',
    brand:         'apple', brandName: 'Apple', category: 'may-tinh-bang',
    price: 36990000, originalPrice: 39990000, stock: 20,
    image:     'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop'],
    rating: 4.9, sold: 4100,
    isNew: true, isBestseller: false, isFlashSale: false, isFeatured: true,
    variants: mkVariants(
      [{ name: 'Bạc',          code: '#e8e8e8' },
       { name: 'Đen không gian',code: '#1c1c1e' }],
      [{ capacity: '256GB', price: 36990000, originalPrice: 39990000, stock: 8  },
       { capacity: '512GB', price: 44990000, originalPrice: 47990000, stock: 6  },
       { capacity: '1TB',   price: 58990000, originalPrice: 61990000, stock: 4  },
       { capacity: '2TB',   price: 72990000, originalPrice: 75990000, stock: 2  }]
    ),
  },
  {
    name:          'Apple iPad Air M2 11 inch 128GB WiFi',
    description:   'iPad Air M2 chip M2 mạnh mẽ, màn hình Liquid Retina 11 inch, hỗ trợ Apple Pencil Pro và Magic Keyboard.',
    brand:         'apple', brandName: 'Apple', category: 'may-tinh-bang',
    price: 17990000, originalPrice: 19990000, stock: 45,
    image:     'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=600&h=600&fit=crop'],
    rating: 4.8, sold: 6200,
    isNew: true, isBestseller: true, isFlashSale: true, isFeatured: true,
    variants: mkVariants(
      [{ name: 'Xanh',   code: '#2196f3' },
       { name: 'Tím',    code: '#9c27b0' },
       { name: 'Xám',    code: '#607d8b' },
       { name: 'Vàng',   code: '#f9a825' }],
      [{ capacity: '128GB', price: 17990000, originalPrice: 19990000, stock: 12 },
       { capacity: '256GB', price: 21990000, originalPrice: 23990000, stock: 10 }]
    ),
  },
  {
    name:          'Apple iPad gen 10 64GB WiFi',
    description:   'iPad gen 10 chip A14 Bionic, màn hình Liquid Retina 10.9 inch, camera 12MP Ultra Wide, USB-C.',
    brand:         'apple', brandName: 'Apple', category: 'may-tinh-bang',
    price: 10990000, originalPrice: 12490000, stock: 60,
    image:     'https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=600&h=600&fit=crop'],
    rating: 4.7, sold: 9800,
    isNew: false, isBestseller: true, isFlashSale: true, isFeatured: false,
    variants: mkVariants(
      [{ name: 'Bạc',  code: '#e8e8e8' },
       { name: 'Hồng', code: '#f48fb1' },
       { name: 'Xanh', code: '#4fc3f7' },
       { name: 'Vàng', code: '#fff176' }],
      [{ capacity: '64GB',  price: 10990000, originalPrice: 12490000, stock: 20 },
       { capacity: '256GB', price: 14490000, originalPrice: 15990000, stock: 15 }]
    ),
  },

  // =========================================
  // MÁY TÍNH BẢNG — SAMSUNG
  // =========================================
  {
    name:          'Samsung Galaxy Tab S9 Ultra 256GB WiFi',
    description:   'Galaxy Tab S9 Ultra Snapdragon 8 Gen 2, màn hình Dynamic AMOLED 2X 14.6 inch 120Hz, bút S Pen, camera 13MP.',
    brand:         'samsung', brandName: 'Samsung', category: 'may-tinh-bang',
    price: 28990000, originalPrice: 31990000, stock: 25,
    image:     'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop'],
    rating: 4.8, sold: 3200,
    isNew: false, isBestseller: true, isFlashSale: false, isFeatured: true,
    variants: mkVariants(
      [{ name: 'Graphite', code: '#424242' },
       { name: 'Beige',    code: '#f5f0e8' }],
      [{ capacity: '256GB', price: 28990000, originalPrice: 31990000, stock: 8 },
       { capacity: '512GB', price: 34990000, originalPrice: 37990000, stock: 6 }]
    ),
  },
  {
    name:          'Samsung Galaxy Tab S9 FE 128GB WiFi',
    description:   'Galaxy Tab S9 FE Exynos 1380, màn hình LCD 10.9 inch 90Hz, bút S Pen, pin 8000mAh, IP68.',
    brand:         'samsung', brandName: 'Samsung', category: 'may-tinh-bang',
    price: 10490000, originalPrice: 12490000, stock: 55,
    image:     'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=600&h=600&fit=crop'],
    rating: 4.5, sold: 7100,
    isNew: false, isBestseller: false, isFlashSale: true, isFeatured: false,
    variants: mkVariants(
      [{ name: 'Graphite', code: '#424242' },
       { name: 'Bạc',      code: '#e0e0e0' },
       { name: 'Tím nhạt', code: '#ce93d8' },
       { name: 'Xanh mint',code: '#80cbc4' }],
      [{ capacity: '128GB', price: 10490000, originalPrice: 12490000, stock: 15 },
       { capacity: '256GB', price: 12990000, originalPrice: 14490000, stock: 10 }]
    ),
  },

  // =========================================
  // MÁY TÍNH BẢNG — XIAOMI
  // =========================================
  {
    name:          'Xiaomi Pad 6 Pro 128GB WiFi',
    description:   'Xiaomi Pad 6 Pro Snapdragon 8+ Gen 1, màn hình IPS 11 inch 144Hz 2.8K, pin 8600mAh, sạc 67W.',
    brand:         'xiaomi', brandName: 'Xiaomi', category: 'may-tinh-bang',
    price: 9990000, originalPrice: 11990000, stock: 40,
    image:     'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=600&h=600&fit=crop'],
    rating: 4.6, sold: 5400,
    isNew: false, isBestseller: false, isFlashSale: true, isFeatured: true,
    variants: mkVariants(
      [{ name: 'Xám', code: '#757575' },
       { name: 'Vàng',code: '#f9a825' }],
      [{ capacity: '128GB', price: 9990000,  originalPrice: 11990000, stock: 12 },
       { capacity: '256GB', price: 11990000, originalPrice: 13990000, stock: 10 },
       { capacity: '512GB', price: 14990000, originalPrice: 16990000, stock: 6  }]
    ),
  },

  // =========================================
  // MÁY TÍNH BẢNG — OPPO, LENOVO
  // =========================================
  {
    name:          'OPPO Pad 2 256GB WiFi',
    description:   'OPPO Pad 2 Dimensity 9000, màn hình LCD 11.61 inch 144Hz 2.8K, bút OPPO Pencil 2, pin 9510mAh.',
    brand:         'oppo', brandName: 'OPPO', category: 'may-tinh-bang',
    price: 12990000, originalPrice: 14990000, stock: 30,
    image:     'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=600&fit=crop'],
    rating: 4.4, sold: 2100,
    isNew: false, isBestseller: false, isFlashSale: false, isFeatured: false,
    variants: mkVariants(
      [{ name: 'Xám bầu trời', code: '#607d8b' },
       { name: 'Bạc',          code: '#e0e0e0' }],
      [{ capacity: '128GB', price: 10990000, originalPrice: 12990000, stock: 10 },
       { capacity: '256GB', price: 12990000, originalPrice: 14990000, stock: 10 }]
    ),
  },
  {
    name:          'Lenovo Tab P12 Pro 256GB WiFi',
    description:   'Lenovo Tab P12 Pro Snapdragon 870, màn hình AMOLED 12.6 inch 120Hz 2K, bút Precision Pen, pin 10200mAh.',
    brand:         'lenovo', brandName: 'Lenovo', category: 'may-tinh-bang',
    price: 15990000, originalPrice: 18990000, stock: 15,
    image:     'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=600&fit=crop'],
    rating: 4.5, sold: 1800,
    isNew: false, isBestseller: false, isFlashSale: false, isFeatured: false,
    variants: mkVariants(
      [{ name: 'Xám嵐', code: '#546e7a' }],
      [{ capacity: '256GB', price: 15990000, originalPrice: 18990000, stock: 8 },
       { capacity: '512GB', price: 19990000, originalPrice: 22990000, stock: 5 }]
    ),
  },
  {
    name:          'Apple iPad mini 6 64GB WiFi',
    description:   'iPad mini 6 chip A15 Bionic, màn hình Liquid Retina 8.3 inch, Touch ID, hỗ trợ Apple Pencil 2.',
    brand:         'apple', brandName: 'Apple', category: 'may-tinh-bang',
    price: 13990000, originalPrice: 15490000, stock: 35,
    image:     'https://images.unsplash.com/photo-1632167567716-09e29064babb?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1632167567716-09e29064babb?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1632167567716-09e29064babb?w=600&h=600&fit=crop'],
    rating: 4.7, sold: 5600,
    isNew: false, isBestseller: true, isFlashSale: false, isFeatured: false,
    variants: mkVariants(
      [{ name: 'Xám không gian', code: '#424242' },
       { name: 'Tím nhạt',       code: '#ce93d8' },
       { name: 'Hồng',           code: '#f48fb1' },
       { name: 'Vàng',           code: '#fff176' }],
      [{ capacity: '64GB',  price: 13990000, originalPrice: 15490000, stock: 10 },
       { capacity: '256GB', price: 17490000, originalPrice: 18990000, stock: 8  }]
    ),
  },
  {
    name:          'Samsung Galaxy Tab A9+ 128GB WiFi',
    description:   'Galaxy Tab A9+ Snapdragon 695, màn hình LCD 11 inch 90Hz, Dolby Atmos, pin 7040mAh, thiết kế mỏng nhẹ.',
    brand:         'samsung', brandName: 'Samsung', category: 'may-tinh-bang',
    price: 7990000, originalPrice: 9490000, stock: 70,
    image:     'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop',
    images:    ['https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop'],
    rating: 4.4, sold: 8300,
    isNew: false, isBestseller: false, isFlashSale: true, isFeatured: false,
    variants: mkVariants(
      [{ name: 'Graphite', code: '#424242' },
       { name: 'Bạc',      code: '#e0e0e0' },
       { name: 'Hồng vàng',code: '#ffab91' }],
      [{ capacity: '64GB',  price: 6490000, originalPrice: 7990000,  stock: 20 },
       { capacity: '128GB', price: 7990000, originalPrice: 9490000,  stock: 20 }]
    ),
  },
]

async function main() {
  console.log('🌱 Bắt đầu seed dữ liệu...')

  // Xóa toàn bộ dữ liệu cũ
  await prisma.product.deleteMany()
  console.log('✅ Đã xóa dữ liệu cũ')

  // Tạo từng sản phẩm
  for (const product of PRODUCTS) {
    const slug = makeSlug(product.name)
    await prisma.product.create({
      data: { ...product, slug },
    })
  }

  console.log(`✅ Đã tạo ${PRODUCTS.length} sản phẩm với variants`)
  console.log('🎉 Seed hoàn thành!')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
