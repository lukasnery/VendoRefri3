import { Request, Response } from "express"
import { ProductService } from "../services/ProductService"

export class ProductController {

  async create(req: Request, res: Response) {

    try {

      const { nome, preco, estoque } = req.body

      const service = new ProductService()

      const product = await service.create(
        nome,
        preco,
        estoque
      )

      return res.status(201).json(product)

    } catch (error: any) {

      return res.status(400).json({
        message: error.message
      })

    }
  }

  async getAll(req: Request, res: Response) {

    try {

      const { page = "1", limit = "10" } = req.query

      const service = new ProductService()

      const products = await service.getAll(
        Number(page),
        Number(limit)
      )

      return res.status(200).json(products)

    } catch (error: any) {

      return res.status(400).json({
        message: error.message
      })

    }
  }

  async getById(req: Request, res: Response) {

    try {

      const id = req.params.id as string

      const service = new ProductService()

      const product = await service.getById(id)

      return res.status(200).json(product)

    } catch (error: any) {

      return res.status(404).json({
        message: error.message
      })

    }
  }

  async update(req: Request, res: Response) {

    try {

      const id = req.params.id as string
      const { nome, preco, estoque } = req.body

      const service = new ProductService()

      const product = await service.update(
        id,
        nome,
        preco,
        estoque
      )

      return res.status(200).json(product)

    } catch (error: any) {

      return res.status(400).json({
        message: error.message
      })

    }
  }

  async delete(req: Request, res: Response) {

    try {

      const id = req.params.id as string

      const service = new ProductService()

      await service.delete(id)

      return res.status(200).json({
        message: "Produto deletado"
      })

    } catch (error: any) {

      return res.status(404).json({
        message: error.message
      })

    }
  }
}