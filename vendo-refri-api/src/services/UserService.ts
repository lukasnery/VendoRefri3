import { prisma } from "../database/prisma"
import bcrypt from "bcrypt"
import { validateCPF } from "../utils/validateCPF"

export class UserService {

  async create(
    nome: string,
    email: string,
    senha: string,
    cpf: string
  ) {

    if (!nome || !email || !senha || !cpf) {
      throw new Error("Campos obrigatórios")
    }

    if (!validateCPF(cpf)) {
      throw new Error("CPF inválido")
    }

    const userExists = await prisma.user.findUnique({
      where: { email }
    })

    if (userExists) {
      throw new Error("Usuário já existe")
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    const user = await prisma.user.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        cpf
      }
    })

    return user
  }

  async getById(id: string) {

    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      throw new Error("Usuário não encontrado")
    }

    return user
  }

  async getAll(page: number, limit: number) {

    const skip = (page - 1) * limit

    const users = await prisma.user.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc"
      }
    })

    return users
  }

  async update(
    id: string,
    nome?: string,
    senha?: string,
    cpf?: string
  ) {

    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      throw new Error("Usuário não encontrado")
    }

    let senhaHash

    if (senha) {
      senhaHash = await bcrypt.hash(senha, 10)
    }

    if (cpf && !validateCPF(cpf)) {
      throw new Error("CPF inválido")
    }

    const updated = await prisma.user.update({
      where: { id },
      data: {
  ...(nome && { nome }),
  ...(senhaHash && { senha: senhaHash }),
  ...(cpf && { cpf })
}
    })

    return updated
  }

  async delete(id: string) {

    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      throw new Error("Usuário não encontrado")
    }

    await prisma.user.delete({
      where: { id }
    })

    return true
  }
}