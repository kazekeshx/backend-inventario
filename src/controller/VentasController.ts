import { Request, Response } from 'express';
import { Venta } from '../models/Venta';
import { Product } from '../models/Product';

export type VentaI = {
    id: number,
    clientName: string,
    products: Array<{ id: number; quantity: number; priceTotal: number }>,
    totalPrice: number,
    comentario: string

}

export class VentasController {
    static createVenta = async (req: Request, res: Response) => {
        const ventaData = req.body as VentaI;

        try {
            // Verificar que todos los productos existen
            for (const item of ventaData.products) {
                const product = await Product.findByPk(item.id);
                if (!product) {
                    return res.status(404).json(`Producto con ID ${item.id} no encontrado`);
                }
            }
            // Verificar que hay suficiente stock para cada producto
            for (const item of ventaData.products) {
                const product = await Product.findByPk(item.id);
                const newQuantity = product!.stock - item.quantity;
                if (newQuantity < 0) {
                    return res.status(400).json({
                        errors: [
                            {
                                msg: `Stock insuficiente para ${product?.name}. Disponible: ${product?.stock}`
                            }
                        ]
                    });
                }
            }
            // Crear la venta
            const nuevaVenta = await Venta.create({
                clientName: ventaData.clientName,
                products: ventaData.products, // ← solo si el campo es tipo JSON en la BD
                totalPrice: ventaData.totalPrice,
                comentario: ventaData.comentario || " "
            });
            // Actualizar el stock de los productos
            for (const item of ventaData.products) {
                const product = await Product.findByPk(item.id);
                const newQuantity = product!.stock - item.quantity;
                await product!.update({ stock: newQuantity });
            }

            return res.status(201).json("Venta registrada correctamente");
        } catch (error) {
            console.error("Error creating sale:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    static getVentas = async (req: Request, res: Response) => {
        try {
            const ventas = await Venta.findAll();
            return res.status(200).json(ventas);
        } catch (error) {
            console.error("Error fetching sales:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }
    static getVentaById = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const venta = await Venta.findByPk(id);
            if (!venta) {
                return res.status(404).json({ message: "Venta no encontrada" });
            }
            return res.status(200).json(venta);
        } catch (error) {
            console.error("Error fetching sale by ID:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    static deleteVenta = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const venta = await Venta.findByPk(id);

            if (!venta) {
                return res.status(404).json("Venta no encontrada");
            }

            // Verifica si venta.products está ya en formato objeto o necesita parsearse
            const productos = Array.isArray(venta.products)
                ? venta.products
                : JSON.parse(venta.products);

            // Devolver el stock a cada producto
            for (const item of productos) {
                const producto = await Product.findByPk(item.id);
                if (producto) {
                    const nuevoStock = producto.stock + item.quantity;
                    await producto.update({ stock: nuevoStock });
                }
            }

            // Eliminar la venta
            await venta.destroy();

            return res.status(200).json("Venta eliminada correctamente");

        } catch (error) {
            console.error("Error deleting sale:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    static updateVenta = async (req: Request, res: Response) => {
        const { id } = req.params;
        const ventaData = req.body as VentaI;

        try {
            const venta = await Venta.findByPk(id);
            if (!venta) {
                return res.status(404).json({ message: "Venta no encontrada" });
            }
            // Verificar que todos los productos existen
            for (const item of ventaData.products) {
                const product = await Product.findByPk(item.id);
                if (!product) {
                    return res.status(404).json(`Producto con ID ${item.id} no encontrado`);
                }
            }
            const productos = venta.products;

            for (const item of productos) {
                const producto = await Product.findByPk(item.id);
                if (producto) {
                    const nuevoStock = producto.stock + item.quantity;
                    await producto.update({ stock: nuevoStock });
                }
            }
            for (const item of ventaData.products) {
                const product = await Product.findByPk(item.id);
                const newQuantity = product!.stock - item.quantity;
                if (newQuantity < 0) {
                    return res.status(400).json({ message: `No hay suficiente stock para el producto con ID ${item.id}` });
                }
            }
            // Actualizar el stock de los productos
            for (const item of ventaData.products) {
                const product = await Product.findByPk(item.id);
                const newQuantity = product!.stock - item.quantity;
                await product!.update({ stock: newQuantity });
            }
            // Actualizar los campos de la venta
            venta.clientName = ventaData.clientName;
            venta.products = ventaData.products; // ← solo si el campo es tipo JSON en la BD
            venta.totalPrice = ventaData.totalPrice;

            await venta.save();

            return res.status(200).json("Venta actualizada correctamente");
        } catch (error) {
            console.error("Error updating sale:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }
    static updateComment = async (req: Request, res: Response) => {
        const id = req.params.id;
        const {comentario} = req.body;
        console.log(comentario)
        try {
            const venta = await Venta.findByPk(id);
            if (!venta) {
                return res.status(404).json(`Venta con ID ${id} no encontrada`);
            }
            venta.comentario = comentario;
            await venta.save();
            return res.status(200).json("Comentario actualizado correctamente");
        } catch (error) {
            console.error("Error updating sale:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}