import { prisma } from "../database/prisma"

export class OrderService {

  async create(
    userId: string,
    productId: string,
    quantidade: number
  ) {

    if (!productId || !quantidade) {
      throw new Error("Campos obrigatórios")
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new Error("Usuário não encontrado")
    }

    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      throw new Error("Produto não encontrado")
    }

    if (product.estoque < quantidade) {
      throw new Error("Estoque insuficiente")
    }

    await prisma.product.update({
      where: { id: productId },
      data: {
        estoque: product.estoque - quantidade
      }
    })

    const order = await prisma.order.create({
      data: {
        userId,
        productId,
        quantidade
      },
      include: {
        product: true,
        user: true
      }
    })

    return order
  }

  async getAll(page: number, limit: number) {

    const skip = (page - 1) * limit

    const orders = await prisma.order.findMany({
      skip,
      take: limit,
      include: {
        product: true,
        user: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return orders
  }

  async getById(id: string) {

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        product: true,
        user: true
      }
    })

    if (!order) {
      throw new Error("Pedido não encontrado")
    }

    return order
  }

  async delete(id: string) {

    const order = await prisma.order.findUnique({
      where: { id }
    })

    if (!order) {
      throw new Error("Pedido não encontrado")
    }

    await prisma.order.delete({
      where: { id }
    })

    return true
  }
}