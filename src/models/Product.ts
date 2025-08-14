// src/models/User.ts
import { DataTypes, Model } from "sequelize"
import { sequelize } from "../config/database"

export class Product extends Model {
  public id!: number
  public name!: string
  public category!: string
  public stock!: number
  public availability!: boolean
  public descuento!: number
  public precio!: number
  public imagen!: string
}


Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    descuento: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    precio: {
      type: DataTypes.DECIMAL(10,3),
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: false,
  }
)