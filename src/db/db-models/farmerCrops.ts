import { DataTypes, Model } from "@sequelize/core";
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ModelAttributes,
} from "@sequelize/core";

export const FarmerCropsDef: ModelAttributes = {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
};

export class FarmerCrops extends Model<
  InferAttributes<FarmerCrops>,
  InferCreationAttributes<FarmerCrops>
> {
  declare CropId: CreationOptional<number>; // 作物 ID
  declare FarmerId: CreationOptional<number>; // 耕种者 ID
  declare count: number;
}
