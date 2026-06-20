/**
 * src/modules/cart/cart.repository.js
 */
import prisma from '../../configs/database.js'

export async function getCartByUser(userId) {
  return prisma.cartItem.findMany({
    where:   { userId },
    include: {
      product: {
        select: {
          id: true, name: true, slug: true, image: true,
          thumbnail: true, price: true, originalPrice: true,
          stock: true, status: true, brand: true, brandName: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function findCartItem(userId, productId) {
  return prisma.cartItem.findUnique({
    where: { userId_productId: { userId, productId } },
  })
}

export async function upsertCartItem(userId, productId, quantity, variant = null) {
  return prisma.cartItem.upsert({
    where:  { userId_productId: { userId, productId } },
    update: { quantity, variant, updatedAt: new Date() },
    create: { userId, productId, quantity, variant },
  })
}

export async function updateCartItemQty(id, userId, quantity) {
  return prisma.cartItem.updateMany({
    where: { id, userId },
    data:  { quantity, updatedAt: new Date() },
  })
}

export async function removeCartItem(id, userId) {
  return prisma.cartItem.deleteMany({ where: { id, userId } })
}

export async function clearCart(userId) {
  return prisma.cartItem.deleteMany({ where: { userId } })
}
