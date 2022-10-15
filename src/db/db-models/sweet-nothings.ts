import { DataTypes, Model } from "@sequelize/core";
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ModelAttributes,
} from "@sequelize/core";

export const SweetNothingsDef: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sentence: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
};

export class SweetNothings extends Model<
  InferAttributes<SweetNothings>,
  InferCreationAttributes<SweetNothings>
> {
  declare id: CreationOptional<number>; // 自增主键
  declare sentence: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
