import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

interface TokenPayload extends JwtPayload {
  id: string
}

interface AuthRequest extends Request {
  user?: {
    id: string
  }
}

export function auth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {

  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      message: "Token não informado"
    })
  }

  try {

    const decoded = jwt.verify(token, "secret") as TokenPayload

    req.user = {
      id: decoded.id
    }

    next()

  } catch {

    return res.status(401).json({
      message: "Token inválido"
    })

  }
}