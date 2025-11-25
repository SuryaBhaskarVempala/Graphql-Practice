import { DataTypes, Model } from "sequelize";
import { sequelize } from "../lib/db";

// Define attributes interface
interface PostAttributes {
  id?: number;      // optional for creation
  title: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Fully typed model
// Fully typed model
export class Post extends Model<PostAttributes, Omit<PostAttributes, "id">> implements PostAttributes {
  declare id: number;
  declare title: string;
  declare userId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

// Initialize model
Post.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "posts",
    modelName: "Post",
  }
);
