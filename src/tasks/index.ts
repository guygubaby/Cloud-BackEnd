import { createLogger } from "../utils/logger";
import { startFarmlandReplenishCronTask } from "./farmlandReplenish";

const logger = createLogger("tasks Entrypoint");

export function setupTasks() {
  try {
    startFarmlandReplenishCronTask(); // 每周二、每周四农场进货
  } catch (err) {
    logger.error(`初始化定时任务出错：${err}`);
  }
}
