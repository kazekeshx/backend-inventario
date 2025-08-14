"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const product_router_1 = __importDefault(require("./routes/product.router"));
const ventas_router_1 = __importDefault(require("./routes/ventas.router"));
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./config/cors");
(0, database_1.connectDB)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)(cors_2.corsConfig));
app.use(express_1.default.json());
//Routes
app.use('/api/products', product_router_1.default);
app.use('/api/ventas', ventas_router_1.default);
exports.default = app;
