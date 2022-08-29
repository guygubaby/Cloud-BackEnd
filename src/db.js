const { Sequelize } = require("sequelize");
const SweetNothingsDef = require('./db-models/sweet-nothings')
const CropsDef = require('./db-models/crops')

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;
const [host, port] = MYSQL_ADDRESS.split(":");
const sequelize = new Sequelize("tree-hole", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

// 定义数据模型
const SweetNothings = sequelize.define('SweetNothings', SweetNothingsDef)
const Crops = sequelize.define('Crops', CropsDef)

async function init() {
  // 数据库初始化方法
  await SweetNothings.sync({ alter: true })
  await Crops.sync({ alter: true })
}

// 导出初始化方法和模型
module.exports = {
  init,
  SweetNothings,
  Crops,
};
