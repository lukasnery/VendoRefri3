import { Request, Response } from "express"
import { OrderService } from "../services/OrderService"

export class OrderController {

  async create(req: Request, res: Response) {

    try {

      const { productId, quantidade } = req.body
      const userId = req.user?.id as string

      const service = new OrderService()

      const order = await service.create(
        userId,
        productId,
        quantidade
      )

      return res.status(201).json(order)

    } catch (error: any) {

      return res.status(400).json({
        message: error.message
      })

    }
  }

  async getAll(req: Request, res: Response) {

    try {

      const { page = "1", limit = "10" } = req.query

      const service = new OrderService()

      const orders = await service.getAll(
        Number(page),
        Number(limit)
      )

      return res.status(200).json(orders)

    } catch (error: any) {

      return res.status(400).json({
        message: error.message
      })

    }
  }

  async getById(req: Request, res: Response) {

    try {

      const id = req.params.id as string

      const service = new OrderService()

      const order = await service.getById(id)

      return res.status(200).json(order)

    } catch (error: any) {

      return res.status(404).json({
        message: error.message
      })

    }
  }

  async delete(req: Request, res: Response) {

    try {

      const id = req.params.id as string

      const service = new OrderService()

      await service.delete(id)

      return res.status(200).json({
        message: "Pedido deletado"
      })

    } catch (error: any) {

      return res.status(404).json({
        message: error.message
      })

    }
  }
}