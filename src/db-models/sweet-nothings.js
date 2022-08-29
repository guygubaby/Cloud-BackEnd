const { DataTypes } = require("sequelize");

/** @type {import('sequelize/types').ModelAttributes} */
const SweetNothingsDef = {
  sentence: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
}

module.exports = SweetNothingsDef
