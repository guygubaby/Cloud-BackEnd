import { Sequelize } from "sequelize";
import { SweetNothingsDef } from "./db-models/sweet-nothings";
import { CropsDef } from "./db-models/crops";
import { FarmerDef } from "./db-models/farmer";
import { setupDB } from "./setup";
import type { FarmerInstance } from "./db-models/farmer";
import type { CropsInstance } from "./db-models/crops";
import type { SweetNothingsInstance } from "./db-models/sweet-nothings";

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

// 定义数据模型
const SweetNothings = sequelize.define<SweetNothingsInstance>(
  "SweetNothings",
  SweetNothingsDef
);
const Crops = sequelize.define<CropsInstance>("Crops", CropsDef);
const Farmer = sequelize.define<FarmerInstance>("Farmer", FarmerDef);

const entitiesMap = {
  SweetNothings,
  Crops,
  Farmer,
};

async function initDB() {
  setupDB(entitiesMap);
}

// 导出初始化方法和模型
export { initDB, SweetNothings, Crops, Farmer };
