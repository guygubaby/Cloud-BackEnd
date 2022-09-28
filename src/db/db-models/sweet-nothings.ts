import { DataTypes } from "sequelize";
import type { Model } from "sequelize";

export const SweetNothingsDef = {
  sentence: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
};

export type SweetNothingsAttributes = {
  sentence: string;
};
export type SweetNothingsInstance = Model<SweetNothingsAttributes> &
  SweetNothingsAttributes;
