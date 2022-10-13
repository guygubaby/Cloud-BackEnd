import { DataTypes } from "@sequelize/core";
import type { Model } from "@sequelize/core";

export const MenstruationDef = {
  monthStr: {
    type: DataTypes.STRING,
    allowNull: false,
  },
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
  monthStr: string;
  startTimestamp: number;
  endTimestamp: number;
};
export type MenstruationInstance = Model<MenstruationAttributes> &
  MenstruationAttributes;
