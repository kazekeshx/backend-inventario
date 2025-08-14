"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Venta extends sequelize_1.Model {
}
exports.Venta = Venta;
Venta.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    clientName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    products: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    totalPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 3),
        allowNull: false,
    },
    comentario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Venta",
    tableName: "ventas",
    timestamps: false,
});
