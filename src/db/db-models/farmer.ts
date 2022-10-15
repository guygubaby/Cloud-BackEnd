import { DataTypes, Model } from "@sequelize/core";
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "@sequelize/core";

export const FarmerDef = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  exp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  coins: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1000,
  },
  manureCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  GridCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 3,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
};

export class Farmer extends Model<
  InferAttributes<Farmer>,
  InferCreationAttributes<Farmer>
> {
  declare id: CreationOptional<number>; // 自增主键
  declare name: string;
  declare exp: CreationOptional<number>;
  declare level: CreationOptional<number>;
  declare coins: CreationOptional<number>;
  declare manureCount: CreationOptional<number>;
  declare GridCount: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
