/**
 * src/modules/user/user.repository.js
 */
import prisma from '../../configs/database.js'

export async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      addresses: true,
      _count: { select: { orders: true, reviews: true } },
    },
  })
}

export async function updateUserById(id, data) {
  return prisma.user.update({ where: { id }, data })
}

export async function upsertAddress(userId, addressData) {
  const { id, isDefault, ...rest } = addressData
  // Nếu set isDefault = true thì reset tất cả địa chỉ khác
  if (isDefault) {
    await prisma.address.updateMany({
      where: { userId },
      data:  { isDefault: false },
    })
  }
  if (id) {
    return prisma.address.update({ where: { id }, data: { ...rest, isDefault: !!isDefault } })
  }
  return prisma.address.create({ data: { userId, ...rest, isDefault: !!isDefault } })
}

export async function deleteAddress(id, userId) {
  return prisma.address.deleteMany({ where: { id, userId } })
}
