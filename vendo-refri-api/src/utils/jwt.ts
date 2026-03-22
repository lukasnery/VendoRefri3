import jwt from "jsonwebtoken"

export function generateToken(userId: string) {
  return jwt.sign(
    { id: userId },
    "secret",
    { expiresIn: "1d" }
  )
}