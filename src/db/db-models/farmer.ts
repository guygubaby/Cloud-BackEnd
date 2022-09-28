import { DataTypes } from "sequelize";
import type { Model, Optional } from "sequelize";

export const FarmerDef = {
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
};

export type FarmerAttributes = {
  name: string;
  exp: number;
  level: number;
  coins: number;
  manureCount: number;
  GridCount: number;
};
export type FarmerInstance = Model<
  FarmerAttributes,
  Optional<
    FarmerAttributes,
    "exp" | "level" | "coins" | "manureCount" | "GridCount"
  >
> &
  FarmerAttributes;
