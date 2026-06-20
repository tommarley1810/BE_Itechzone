/**
 * src/modules/order/order.repository.js
 */
import prisma from '../../configs/database.js'

export async function createOrder(userId, orderData, items) {
  return prisma.$transaction(async (tx) => {
    // Tạo order
    const order = await tx.order.create({
      data: {
        userId,
        ...orderData,
        items: {
          create: items.map(item => ({
            productId:    item.productId,
            productName:  item.productName,
            productImage: item.productImage,
            variant:      item.variant ?? null,
            quantity:     item.quantity,
            price:        item.price,
          })),
        },
      },
      include: { items: true },
    })

    // Cập nhật stock và sold cho từng sản phẩm
    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data:  {
          stock: { decrement: item.quantity },
          sold:  { increment: item.quantity },
        },
      })
    }

    // Xoá giỏ hàng
    await tx.cartItem.deleteMany({ where: { userId } })

    return order
  })
}

export async function findOrdersByUser(userId) {
  return prisma.order.findMany({
    where:   { userId },
    include: {
      items: {
        include: { product: { select: { id: true, slug: true, image: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function findOrderById(id, userId) {
  return prisma.order.findFirst({
    where:   { id, userId },
    include: { items: true },
  })
}

export async function cancelOrder(id, userId) {
  // Chỉ huỷ khi đang pending
  const order = await prisma.order.findFirst({
    where: { id, userId, status: 'pending' },
    include: { items: true },
  })
  if (!order) {
    const err = new Error('Không tìm thấy đơn hàng hoặc không thể huỷ')
    err.statusCode = 400
    throw err
  }

  return prisma.$transaction(async (tx) => {
    // Cập nhật status
    const updated = await tx.order.update({
      where: { id },
      data:  { status: 'cancelled' },
    })
    // Hoàn lại stock
    for (const item of order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data:  {
          stock: { increment: item.quantity },
          sold:  { decrement: item.quantity },
        },
      })
    }
    return updated
  })
}
