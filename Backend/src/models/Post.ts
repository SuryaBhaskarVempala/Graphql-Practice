import { DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { sequelize } from "../lib/db";

export class Post extends Model {
  declare id: number;
  declare title: string;
  declare userId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}


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
