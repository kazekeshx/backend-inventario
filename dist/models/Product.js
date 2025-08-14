"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
// src/models/User.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    availability: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    descuento: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    precio: {
        type: sequelize_1.DataTypes.DECIMAL(10, 3),
        allowNull: false,
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: false,
});
