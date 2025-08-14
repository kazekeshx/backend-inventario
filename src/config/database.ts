import { Sequelize } from "sequelize"
import { exit } from "node:process"
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DATABASE || "",
  process.env.USER || "",
  process.env.PASSWORD || "",
  {
    host: process.env.HOST,
    dialect: "mysql"
  }
)

export const connectDB = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: false });
    console.log("Conexión exitosa a la base de datos")
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error)
    exit(1)
  }
}