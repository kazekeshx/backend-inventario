import { DataTypes, Model } from "sequelize"
import { sequelize } from "../config/database"

export class Venta extends Model {
  public id!: number
  public date!: Date
  public clientName!: string
  public products!: Array<{ id: number; quantity: number; priceTotal: number }>
  public totalPrice!: number
  public comentario!: string
}

Venta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10,3),
      allowNull: false,
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Venta",
    tableName: "ventas",
    timestamps: false,
  }
)