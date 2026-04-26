import { prisma } from "../database/prisma"

export class ProductService {

  async create(
    nome: string,
    preco: number,
    estoque: number
  ) {

    if (!nome || !preco) {
      throw new Error("Campos obrigatórios")
    }

    const product = await prisma.product.create({
      data: {
        nome,
        preco,
        estoque
      }
    })

    return product
  }

  async getAll(page: number, limit: number) {

    const skip = (page - 1) * limit

    const products = await prisma.product.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc"
      }
    })

    return products
  }

  async getById(id: string) {

    const product = await prisma.product.findUnique({
      where: { id }
    })

    if (!product) {
      throw new Error("Produto não encontrado")
    }

    return product
  }

  async update(
    id: string,
    nome?: string,
    preco?: number,
    estoque?: number
  ) {

    const product = await prisma.product.findUnique({
      where: { id }
    })

    if (!product) {
      throw new Error("Produto não encontrado")
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(nome && { nome }),
        ...(preco && { preco }),
        ...(estoque !== undefined && { estoque })
      }
    })

    return updated
  }

  async delete(id: string) {
  const product = await prisma.product.findUnique({
    where: { id }
  })

  if (!product) {
    throw new Error("Produto não encontrado")
  }

  const linkedOrder = await prisma.order.findFirst({
    where: { productId: id }
  })

  if (linkedOrder) {
    throw new Error("Produto possui pedidos vinculados e não pode ser excluído")
  }

  await prisma.product.delete({
    where: { id }
  })

  return true
}
}