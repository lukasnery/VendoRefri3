import bcrypt from "bcrypt"
import { prisma } from "../database/prisma"
import { generateToken } from "../utils/jwt"

export class AuthService {

  async login(
    email: string,
    senha: string
  ) {

    if (!email || !senha) {
      throw new Error("Campos obrigatórios")
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw new Error("Usuário não existe")
    }

    const valid = await bcrypt.compare(
      senha,
      user.senha
    )

    if (!valid) {
      throw new Error("Senha inválida")
    }

    const token = generateToken(user.id)

    return {
      token,
      user
    }
  }
}