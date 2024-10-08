/* eslint-disable no-undef */
import { Sequelize } from "sequelize";
import 'dotenv/config';

export const sequelize = new Sequelize({
  dialect: process.env.DB_TYPE ?? "mysql",
  host: process.env.DB_HOST ?? "localhost",
  port: parseInt(process.env.DB_PORT) ?? 3306,
  username: process.env.DB_USER ?? "root",
  password: process.env.DB_PASS ?? "",
  database: process.env.DB_NAME ?? "",
  define: {
    timestamps: false,
  },
});
