import { DataTypes, Model } from "@sequelize/core";
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "@sequelize/core";

export const CropsDef = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cropId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requiredLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seedCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  harvestCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  onSaleCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
};

export class Crops extends Model<
  InferAttributes<Crops>,
  InferCreationAttributes<Crops>
> {
  declare id: CreationOptional<number>; // 自增主键
  declare cropId: string; // 作物标识符
  declare name: string;
  declare description: string;
  declare requiredLevel: number;
  declare seedCount: number;
  declare harvestCount: number;
  declare onSaleCount: number;
  declare price: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
