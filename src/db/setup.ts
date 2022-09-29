import { setupTasks } from "../tasks";
import { createLogger } from "../utils/logger";
import { SequelizeConnectionRefusedErrorName } from "../shared";
import type { SweetNothingsInstance } from "./db-models/sweet-nothings";
import type { CropsInstance } from "./db-models/crops";
import type { FarmerInstance } from "./db-models/farmer";
import type { ModelStatic } from "@sequelize/core/types";

const logger = createLogger("db Setup");

interface EntitiesMap {
  SweetNothings: ModelStatic<SweetNothingsInstance>;
  Crops: ModelStatic<CropsInstance>;
  Farmer: ModelStatic<FarmerInstance>;
}

function isDatabaseConnectionError(err: any): err is Error & { name: string } {
  return err instanceof Error && Reflect.has(err, "name");
}
function tryInitEntity(entitiesMap: EntitiesMap, name: keyof EntitiesMap) {
  return entitiesMap[name]
    .sync({ alter: true })
    .then(() => {
      logger.info(`数据库实体 ${name} 初始完成`);
      return Promise.resolve(true);
    })
    .catch((err) => {
      if (
        isDatabaseConnectionError(err) &&
        err.name === SequelizeConnectionRefusedErrorName
      ) {
        logger.error(`🤪 数据库似乎未启动...`);
        process.exit();
      }
      logger.error(`数据库实体 ${name} 初始化出错了：${err}`);
      return Promise.resolve(false);
    });
}
function syncModelsStruct(entitiesMap: EntitiesMap) {
  Promise.all([
    tryInitEntity(entitiesMap, "SweetNothings"),
    tryInitEntity(entitiesMap, "Crops"),
    tryInitEntity(entitiesMap, "Farmer"),
  ]).then((results) => {
    if (!results.every(Boolean)) {
      process.exit();
    }
  });
}
function syncModelsRelationship(entitiesMap: EntitiesMap) {
  const { Farmer, Crops } = entitiesMap;
  Crops.belongsToMany(Farmer, { through: "FarmerCrops" });
}

export async function setupDB(entitiesMap: EntitiesMap) {
  // 数据库模型基础结构初始化
  syncModelsStruct(entitiesMap);
  // 数据库模型关联初始化
  syncModelsRelationship(entitiesMap);

  // 启动一些定时任务
  setupTasks();
}
