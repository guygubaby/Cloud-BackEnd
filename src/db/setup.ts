import { setupTasks } from "../tasks";
import { createLogger } from "../utils/logger";
import { SequelizeConnectionRefusedErrorName } from "../shared";
import type { ModelStatic } from "@sequelize/core";
import type { SweetNothings } from "./db-models/sweet-nothings";
import type { Crops } from "./db-models/crops";
import type { Farmer } from "./db-models/farmer";
import type { Menstruation } from "./db-models/menstruation";
import type { FarmerCrops } from "./db-models/farmerCrops";

const logger = createLogger("db Setup");

interface EntitiesMap {
  SweetNothings: ModelStatic<SweetNothings>;
  Crops: ModelStatic<Crops>;
  Farmer: ModelStatic<Farmer>;
  Menstruation: ModelStatic<Menstruation>;

  // 关联表
  FarmerCrops: ModelStatic<FarmerCrops>;
}
const associationTableNames = ["FarmerCrops"];

function isDatabaseConnectionError(err: any): err is Error & { name: string } {
  return err instanceof Error && Reflect.has(err, "name");
}
function tryInitEntity(entitiesMap: EntitiesMap, name: keyof EntitiesMap) {
  return entitiesMap[name]
    .sync({
      alter: associationTableNames.includes(name), // 关联表不需要 alter
    })
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
    Object.keys(entitiesMap).map((tableName) =>
      tryInitEntity(entitiesMap, tableName as keyof EntitiesMap)
    ),
  ]).then((results) => {
    if (!results.every(Boolean)) {
      process.exit();
    }
  });
}
function syncModelsRelationship(entitiesMap: EntitiesMap) {
  const { Farmer, Crops, FarmerCrops } = entitiesMap;

  // 耕作者 & 作物 多对多关系
  Crops.belongsToMany(Farmer, { through: FarmerCrops });
  Farmer.belongsToMany(Crops, { through: FarmerCrops });

  // 耕作者 & 土地 一对多关系
}

export async function setupDB(entitiesMap: EntitiesMap) {
  // 数据库模型关联初始化
  syncModelsRelationship(entitiesMap);
  // 数据库模型基础结构初始化
  syncModelsStruct(entitiesMap);

  // 启动一些定时任务
  setupTasks();
}
