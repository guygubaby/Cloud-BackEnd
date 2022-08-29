const { DataTypes } = require("sequelize");

/**
 * @param {import("sequelize/types").Sequelize} sequelize
 * @returns {import("sequelize/types").ModelStatic} sweetNothingsModel
 */
const SweetNothingsDef = {
  sentence: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
}

module.exports = SweetNothingsDef
