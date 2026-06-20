/**
 * scripts/migrate-data.js
 * Copy toàn bộ sản phẩm từ localhost PostgreSQL → Neon
 * Chạy: node scripts/migrate-data.js
 */
import { PrismaClient } from '@prisma/client'

const LOCAL_URL  = 'postgresql://postgres:123456@localhost:5432/itechzone'
const NEON_URL   = process.env.NEON_URL // truyền qua env

if (!NEON_URL) {
  console.error('❌ Thiếu NEON_URL. Chạy: $env:NEON_URL="<url neon>"; node scripts/migrate-data.js')
  process.exit(1)
}

const local = new PrismaClient({ datasources: { db: { url: LOCAL_URL } } })
const neon  = new PrismaClient({ datasources: { db: { url: NEON_URL  } } })

async function main() {
  console.log('📦 Đang đọc sản phẩm từ localhost...')
  const products = await local.product.findMany()
  console.log(`   → Tìm thấy ${products.length} sản phẩm`)

  console.log('🗑️  Xoá sản phẩm cũ trên Neon...')
  await neon.product.deleteMany()

  console.log('⬆️  Đang upload lên Neon...')
  for (const p of products) {
    await neon.product.create({ data: p })
    process.stdout.write('.')
  }

  console.log(`\n✅ Đã copy ${products.length} sản phẩm lên Neon!`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await local.$disconnect(); await neon.$disconnect() })
