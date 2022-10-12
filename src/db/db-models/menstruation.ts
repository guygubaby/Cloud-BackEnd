import { DataTypes } from "@sequelize/core";
import type { Model } from "@sequelize/core";

export const MenstruationDef = {
  startTimestamp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  endTimestamp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

export type MenstruationAttributes = {
  startTimestamp: number;
  endTimestamp: number;
};
export type MenstruationInstance = Model<MenstruationAttributes> &
  MenstruationAttributes;
