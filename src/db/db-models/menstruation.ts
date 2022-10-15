import { DataTypes, Model } from "@sequelize/core";
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "@sequelize/core";

export const MenstruationDef = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
};

export class Menstruation extends Model<
  InferAttributes<Menstruation>,
  InferCreationAttributes<Menstruation>
> {
  declare id: CreationOptional<number>; // 自增主键
  declare monthStr: string;
  declare startTimestamp: number;
  declare endTimestamp: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
