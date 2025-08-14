"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const Validation_1 = require("../middleware/Validation");
const VentasController_1 = require("../controller/VentasController");
const router = (0, express_1.Router)();
router.post("/", (0, express_validator_1.body)("clientName").notEmpty().withMessage("El nombre del cliente es obligatorio"), (0, express_validator_1.body)("products").isArray({ min: 1 }).withMessage("Debe haber al menos un producto en la venta"), (0, express_validator_1.body)("products.*.id")
    .isInt({ gt: 0 })
    .withMessage("El ID del producto debe ser un número entero válido"), (0, express_validator_1.body)("products.*.quantity")
    .isInt({ gt: 0 })
    .withMessage("La cantidad debe ser un número entero mayor a 0"), (0, express_validator_1.body)("products.*.priceTotal")
    .isFloat({ min: 0 })
    .withMessage("El precio total del producto debe ser mayor o igual a 0"), (0, express_validator_1.body)("totalPrice").isFloat({ min: 0 }).withMessage("El precio total debe ser un número mayor o igual a 0"), (0, express_validator_1.body)("comentario")
    .optional()
    .isString().withMessage("El comentario debe ser texto")
    .isLength({ max: 255 }).withMessage("El comentario no puede tener más de 255 caracteres"), Validation_1.handleInputErrors, VentasController_1.VentasController.createVenta);
router.get("/", VentasController_1.VentasController.getVentas);
router.get("/:id", (0, express_validator_1.param)("id").isInt({ gt: 0 }).withMessage("ID Inválido"), Validation_1.handleInputErrors, VentasController_1.VentasController.getVentaById);
router.delete("/:id", (0, express_validator_1.param)("id").isInt({ gt: 0 }).withMessage("ID Inválido"), Validation_1.handleInputErrors, VentasController_1.VentasController.deleteVenta);
router.put("/:id/comment", (0, express_validator_1.param)("id").isInt({ gt: 0 }).withMessage("ID Inválido"), (0, express_validator_1.body)("comentario")
    .optional(), Validation_1.handleInputErrors, VentasController_1.VentasController.updateComment);
router.put("/:id", (0, express_validator_1.param)("id").isInt({ gt: 0 }).withMessage("ID Inválido"), (0, express_validator_1.body)("clientName").notEmpty().withMessage("El nombre del cliente es obligatorio"), (0, express_validator_1.body)("products").isArray({ min: 1 }).withMessage("Debe haber al menos un producto en la venta"), (0, express_validator_1.body)("products.*.id")
    .isInt({ gt: 0 })
    .withMessage("El ID del producto debe ser un número entero válido"), (0, express_validator_1.body)("products.*.quantity")
    .isInt({ gt: 0 })
    .withMessage("La cantidad debe ser un número entero mayor a 0"), (0, express_validator_1.body)("products.*.priceTotal")
    .isFloat({ min: 0 })
    .withMessage("El precio total del producto debe ser mayor o igual a 0"), (0, express_validator_1.body)("totalPrice").isFloat({ min: 0 }).withMessage("El precio total debe ser un número mayor o igual a 0"), Validation_1.handleInputErrors, VentasController_1.VentasController.updateVenta);
exports.default = router;
