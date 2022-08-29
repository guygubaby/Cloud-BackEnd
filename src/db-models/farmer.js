const { DataTypes } = require("sequelize");

/** @type {import('sequelize/types').ModelAttributes} */
const FarmerDef = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  coins: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1000
  },
  manureCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
}

module.exports = FarmerDef
