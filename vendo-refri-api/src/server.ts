import express from "express"
import cors from "cors"
import { config } from "dotenv"

import orderRoutes from "./routes/orderRoutes"
import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"
import productRoutes from "./routes/productRoutes"

config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/orders", orderRoutes)
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/products", productRoutes)

app.get("/", (req, res) => {
  res.send("API VendoRefri rodando 🚀")
})

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})