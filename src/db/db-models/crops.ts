import { DataTypes } from "@sequelize/core";
import type { Model } from "@sequelize/core";

export const CropsDef = {
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
};

export type CropsAttributes = {
  cropId: string;
  name: string;
  description: string;
  requiredLevel: number;
  seedCount: number;
  harvestCount: number;
  onSaleCount: number;
  price: number;
};
export type CropsInstance = Model<CropsAttributes> & CropsAttributes;
