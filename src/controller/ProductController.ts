import { Product } from "../models/Product";
import { Request, Response } from 'express';
export class ProductController {
    static createProduct = async (req: Request, res: Response) => {
        const { name, category, stock, availability, descuento, precio, imagen } = req.body;
        try {
            const product = await Product.create({
                name,
                category,
                stock,
                availability,
                descuento,
                precio,
                imagen
            });
            return res.status(201).json("Producto creado correctamente");
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    static getAllProducts = async (req: Request, res: Response) => {
        try {

            const products = await Product.findAll();
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    static getProductById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: "Producto encontrado" });
            }
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    static updateProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, category, stock, availability, descuento, precio, imagen } = req.body;
        try {
            const product = await Product.findByPk(id);
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
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    static deleteProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const product = await Product.destroy({ where: { id } });
            if (!product) {
                return res.status(404).json("Producto no encontrado");
            }
            return res.status(200).json("Producto eliminado correctamente");
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

}

