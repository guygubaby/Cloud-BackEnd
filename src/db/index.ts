import { Sequelize } from "sequelize";
import { createLogger } from "../utils/logger";
import { setupTasks } from "../tasks";
import { SequelizeConnectionRefusedErrorName } from "../shared";
import { SweetNothingsDef } from "./db-models/sweet-nothings";
import { CropsDef } from "./db-models/crops";
import { FarmerDef } from "./db-models/farmer";
import type { FarmerInstance } from "./db-models/farmer";
import type { CropsInstance } from "./db-models/crops";
import type { SweetNothingsInstance } from "./db-models/sweet-nothings";

const logger = createLogger("db Entrypoint");

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

function isDatabaseConnectionError(err: any): err is Error & { name: string } {
  return err instanceof Error && Reflect.has(err, "name");
}
async function tryInitEntity(name: keyof typeof entitiesMap) {
  try {
    await entitiesMap[name].sync();
    logger.info(`数据库实体 ${name} 初始完成`);
    return true;
  } catch (err) {
    if (
      isDatabaseConnectionError(err) &&
      err.name === SequelizeConnectionRefusedErrorName
    ) {
      logger.error(`🤪 数据库似乎未启动...`);
      process.exit();
    }
    logger.error(`数据库实体 ${name} 初始化出错了：${err}`);
    return false;
  }
}

async function initDB() {
  // 数据库初始化方法
  Promise.all([
    tryInitEntity("SweetNothings"),
    tryInitEntity("Crops"),
    tryInitEntity("Farmer"),
  ]).then((results) => {
    if (results.every(Boolean)) {
      process.exit();
    }
  });

  // 启动一些定时任务
  setupTasks();
}

// 导出初始化方法和模型
export { initDB, SweetNothings, Crops, Farmer };
