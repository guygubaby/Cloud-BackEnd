import { DataTypes } from "@sequelize/core";
import type { Model } from "@sequelize/core";

export const MenstruationDef = {
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

export type MenstruationAttributes = {
  startDate: Date;
  endDate: Date;
};
export type MenstruationInstance = Model<MenstruationAttributes> &
  MenstruationAttributes;
