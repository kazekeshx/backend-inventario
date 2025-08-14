// src/routes/user.routes.ts
import { Router } from "express"
import { body, param } from "express-validator";
import { ProductController } from "../controller/ProductController"
import { handleInputErrors } from "../middleware/Validation"

const router = Router()

router.post("/",
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("category").notEmpty().withMessage("La categoría es obligatoria"),
  body("stock").isInt({ gt: 0 }).withMessage("El stock debe ser un número entero mayor que 0"),
  body("availability").isBoolean().withMessage("La disponibilidad debe ser un valor booleano"),
  body("descuento").optional().isFloat({ min: 0 }).withMessage("El descuento debe ser un número mayor o igual a 0"),
  body("precio").isFloat({ min: 0 }).withMessage("El precio debe ser un número mayor o igual a 0"),
  body("imagen").notEmpty().withMessage("La imagen es obligatoria"),
  handleInputErrors,
  ProductController.createProduct)

router.get("/",
  ProductController.getAllProducts)

router.get("/:id",
  param("id").isInt().withMessage("ID inválido"),
  handleInputErrors,
  ProductController.getProductById)

router.put("/:id",
  param("id").isInt().withMessage("ID inválido"),
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("category").notEmpty().withMessage("La categoría es obligatoria"),
  body("stock").isInt({ gt: 0 }).withMessage("El stock debe ser un número entero mayor que 0"),
  body("availability").isBoolean().withMessage("La disponibilidad debe ser un valor booleano"),
  body("descuento").optional().isFloat({ min: 0 }).withMessage("El descuento debe ser un número mayor o igual a 0"),
  body("precio").isFloat({ min: 0 }).withMessage("El precio debe ser un número mayor o igual a 0"),
  body("imagen").notEmpty().withMessage("La imagen es obligatoria"),
  handleInputErrors,
  ProductController.updateProduct)

router.delete("/:id",
  param("id").isInt().withMessage("ID inválido"),
  handleInputErrors,
  ProductController.deleteProduct)

export default router