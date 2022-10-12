import { DataTypes } from "@sequelize/core";
import type { Model } from "@sequelize/core";

export const MenstruationDef = {
  startTimestamp: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  endTimestamp: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
};

export type MenstruationAttributes = {
  startTimestamp: number;
  endTimestamp: number;
};
export type MenstruationInstance = Model<MenstruationAttributes> &
  MenstruationAttributes;
