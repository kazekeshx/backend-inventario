"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/user.routes.ts
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ProductController_1 = require("../controller/ProductController");
const Validation_1 = require("../middleware/Validation");
const router = (0, express_1.Router)();
router.post("/", (0, express_validator_1.body)("name").notEmpty().withMessage("El nombre es obligatorio"), (0, express_validator_1.body)("category").notEmpty().withMessage("La categoría es obligatoria"), (0, express_validator_1.body)("stock").isInt({ gt: 0 }).withMessage("El stock debe ser un número entero mayor que 0"), (0, express_validator_1.body)("availability").isBoolean().withMessage("La disponibilidad debe ser un valor booleano"), (0, express_validator_1.body)("descuento").optional().isFloat({ min: 0 }).withMessage("El descuento debe ser un número mayor o igual a 0"), (0, express_validator_1.body)("precio").isFloat({ min: 0 }).withMessage("El precio debe ser un número mayor o igual a 0"), (0, express_validator_1.body)("imagen").notEmpty().withMessage("La imagen es obligatoria"), Validation_1.handleInputErrors, ProductController_1.ProductController.createProduct);
router.get("/", ProductController_1.ProductController.getAllProducts);
router.get("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID inválido"), Validation_1.handleInputErrors, ProductController_1.ProductController.getProductById);
router.put("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID inválido"), (0, express_validator_1.body)("name").notEmpty().withMessage("El nombre es obligatorio"), (0, express_validator_1.body)("category").notEmpty().withMessage("La categoría es obligatoria"), (0, express_validator_1.body)("stock").isInt({ gt: 0 }).withMessage("El stock debe ser un número entero mayor que 0"), (0, express_validator_1.body)("availability").isBoolean().withMessage("La disponibilidad debe ser un valor booleano"), (0, express_validator_1.body)("descuento").optional().isFloat({ min: 0 }).withMessage("El descuento debe ser un número mayor o igual a 0"), (0, express_validator_1.body)("precio").isFloat({ min: 0 }).withMessage("El precio debe ser un número mayor o igual a 0"), (0, express_validator_1.body)("imagen").notEmpty().withMessage("La imagen es obligatoria"), Validation_1.handleInputErrors, ProductController_1.ProductController.updateProduct);
router.delete("/:id", (0, express_validator_1.param)("id").isInt().withMessage("ID inválido"), Validation_1.handleInputErrors, ProductController_1.ProductController.deleteProduct);
exports.default = router;
