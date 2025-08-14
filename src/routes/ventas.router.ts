import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/Validation";
import { VentasController } from "../controller/VentasController";

const router = Router();

router.post("/",
    body("clientName").notEmpty().withMessage("El nombre del cliente es obligatorio"),
    body("products").isArray({ min: 1 }).withMessage("Debe haber al menos un producto en la venta"),
    body("products.*.id")
        .isInt({ gt: 0 })
        .withMessage("El ID del producto debe ser un número entero válido"),

    body("products.*.quantity")
        .isInt({ gt: 0 })
        .withMessage("La cantidad debe ser un número entero mayor a 0"),

    body("products.*.priceTotal")
        .isFloat({ min: 0 })
        .withMessage("El precio total del producto debe ser mayor o igual a 0"),
    body("totalPrice").isFloat({ min: 0 }).withMessage("El precio total debe ser un número mayor o igual a 0"),
    body("comentario")
        .optional()
        .isString().withMessage("El comentario debe ser texto")
        .isLength({ max: 255 }).withMessage("El comentario no puede tener más de 255 caracteres"),
    handleInputErrors,
    VentasController.createVenta
)

router.get("/",
    VentasController.getVentas
)

router.get("/:id",
    param("id").isInt({ gt: 0 }).withMessage("ID Inválido"),
    handleInputErrors,
    VentasController.getVentaById
)

router.delete("/:id",
    param("id").isInt({ gt: 0 }).withMessage("ID Inválido"),
    handleInputErrors,
    VentasController.deleteVenta
)

router.put("/:id/comment",
    param("id").isInt({ gt: 0 }).withMessage("ID Inválido"),
    body("comentario")
    .optional(),
    handleInputErrors,
    VentasController.updateComment
)

router.put("/:id",
    param("id").isInt({ gt: 0 }).withMessage("ID Inválido"),
    body("clientName").notEmpty().withMessage("El nombre del cliente es obligatorio"),
    body("products").isArray({ min: 1 }).withMessage("Debe haber al menos un producto en la venta"),
    body("products.*.id")
        .isInt({ gt: 0 })
        .withMessage("El ID del producto debe ser un número entero válido"),

    body("products.*.quantity")
        .isInt({ gt: 0 })
        .withMessage("La cantidad debe ser un número entero mayor a 0"),

    body("products.*.priceTotal")
        .isFloat({ min: 0 })
        .withMessage("El precio total del producto debe ser mayor o igual a 0"),
    body("totalPrice").isFloat({ min: 0 }).withMessage("El precio total debe ser un número mayor o igual a 0"),
    handleInputErrors,
    VentasController.updateVenta
)

export default router;