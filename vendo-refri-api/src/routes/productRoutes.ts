import { Router } from "express"
import { ProductController } from "../controllers/ProductController"
import { auth } from "../middlewares/auth"

const router = Router()

const controller = new ProductController()

router.post("/", auth, controller.create)

router.get("/", controller.getAll)

router.get("/:id", controller.getById)

router.put("/:id", auth, controller.update)

router.delete("/:id", auth, controller.delete)

export default router