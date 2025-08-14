"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const node_process_1 = require("node:process");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelize = new sequelize_1.Sequelize(process.env.DATABASE || "", process.env.USER || "", process.env.PASSWORD || "", {
    host: process.env.HOST,
    dialect: "mysql"
});
const connectDB = async () => {
    try {
        await exports.sequelize.authenticate();
        await exports.sequelize.sync({ force: false });
        console.log("Conexión exitosa a la base de datos");
    }
    catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        (0, node_process_1.exit)(1);
    }
};
exports.connectDB = connectDB;
