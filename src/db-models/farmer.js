const { DataTypes } = require("sequelize");

/** @type {import('sequelize/types').ModelAttributes} */
const FarmerDef = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  exp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
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
  GridCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 3
  }
}

module.exports = FarmerDef
