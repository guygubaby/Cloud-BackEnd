import { Sequelize } from "@sequelize/core";
import { SweetNothings, SweetNothingsDef } from "./db-models/sweet-nothings";
import { Crops, CropsDef } from "./db-models/crops";
import { Farmer, FarmerDef } from "./db-models/farmer";
import { setupDB } from "./setup";
import { Menstruation, MenstruationDef } from "./db-models/menstruation";
import { FarmerCrops, FarmerCropsDef } from "./db-models/farmerCrops";

// 从环境变量中读取数据库配置
const {
  MYSQL_USERNAME = "",
  MYSQL_PASSWORD = "",
  MYSQL_ADDRESS = "",
} = process.env;
const [host, port] = MYSQL_ADDRESS.split(":");
const sequelize = new Sequelize("tree-hole", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port: Number(port),
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  logging: process.env.SHOW_SQL === "true",
});

// 初始化数据模型
SweetNothings.init(SweetNothingsDef, { sequelize });
Crops.init(CropsDef, { sequelize });
Farmer.init(FarmerDef, { sequelize });
Menstruation.init(MenstruationDef, { sequelize });
// 定义关联表
FarmerCrops.init(FarmerCropsDef, { sequelize, timestamps: false });

const entitiesMap = {
  SweetNothings,
  Crops,
  Farmer,
  Menstruation,
  FarmerCrops,
};

async function initDB() {
  setupDB(entitiesMap);
}

// 导出初始化方法和模型
export { initDB, SweetNothings, Crops, Farmer, Menstruation, FarmerCrops };
