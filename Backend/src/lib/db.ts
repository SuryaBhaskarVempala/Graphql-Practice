import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("cura_practice", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
  } catch (error) {
    console.error("Unable to connect to DB:", error);
  }
};
