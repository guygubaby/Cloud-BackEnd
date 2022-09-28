import { startFarmlandReplenishCronTask } from "./farmlandReplenish";

export function setupTasks() {
  startFarmlandReplenishCronTask(); // 每周二、每周四农场进货
}
