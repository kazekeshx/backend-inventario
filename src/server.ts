import express from "express";
import { connectDB } from "./config/database";
import productRoutes from "./routes/product.router";
import ventasRoutes from "./routes/ventas.router";
import cors from "cors";
import { corsConfig } from "./config/cors";


connectDB();

const app = express();

app.use(cors(corsConfig));

app.use(express.json());

//Routes
app.use('/api/products', productRoutes);
app.use('/api/ventas', ventasRoutes);

export default app