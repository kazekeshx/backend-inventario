"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const Product_1 = require("../models/Product");
class ProductController {
}
exports.ProductController = ProductController;
_a = ProductController;
ProductController.createProduct = async (req, res) => {
    const { name, category, stock, availability, descuento, precio, imagen } = req.body;
    try {
        const product = await Product_1.Product.create({
            name,
            category,
            stock,
            availability,
            descuento,
            precio,
            imagen
        });
        return res.status(201).json("Producto creado correctamente");
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
ProductController.getAllProducts = async (req, res) => {
    try {
        const products = await Product_1.Product.findAll();
        return res.status(200).json(products);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
ProductController.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product_1.Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto encontrado" });
        }
        return res.status(200).json(product);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
ProductController.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, category, stock, availability, descuento, precio, imagen } = req.body;
    try {
        const product = await Product_1.Product.findByPk(id);
        if (!product) {
            return res.status(404).json("Producto no encontrado");
        }
        await product.update({
            name,
            category,
            stock,
            availability,
            descuento,
            precio,
            imagen
        });
        return res.status(200).json("Producto actualizado correctamente");
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
ProductController.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product_1.Product.destroy({ where: { id } });
        if (!product) {
            return res.status(404).json("Producto no encontrado");
        }
        return res.status(200).json("Producto eliminado correctamente");
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
