const { DataTypes } = require("sequelize");

/**
 * @param {import("sequelize/types").Sequelize} sequelize 
 * @returns {import("sequelize/types").ModelStatic} cropsModel
 */
const CropsDef = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  harvestCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 0,
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
}

module.exports = CropsDef
