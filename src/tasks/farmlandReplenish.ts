import schedule from "node-schedule";
import { Crops } from "../db";
import { cropsMaxiumMap } from "../shared";
import { createLogger } from "../utils/logger";

const logger = createLogger("FarmlandReplenish");

// min <= n <= max
const randomIntFromRange = (min: number, max: number) =>
  Math.round(Math.random() * (max - min)) + min;

// < requiredLevel, replenish count in every time >
const createCropReplenishCountMap = () =>
  new Map<number, number>(
    Array.from({ length: 10 }, (_, i) => {
      const requiredLevel = i + 1;
      const max = 100 - i * 10,
        min = max - 10;

      return [requiredLevel, randomIntFromRange(min, max)];
    })
  );

async function replenishFarmlandStore() {
  const newReplenish = createCropReplenishCountMap(); // 进了一批新货，按等级随机生成进货数
  for (const [requiredLevel, newCropsCount] of newReplenish) {
    const cropEntities = await Crops.findAll({ where: { requiredLevel } });
    if (cropEntities.length === 0) {
      continue;
    }

    for (const crop of cropEntities) {
      const maxiumCount = cropsMaxiumMap.get(requiredLevel);
      if (!maxiumCount) continue;
      if (crop.onSaleCount === maxiumCount) {
        logger.info(`作物 ${crop.name} 在售量已经达最大限值`);
        continue;
      }
      let updatedCount = crop.onSaleCount + newCropsCount;
      // 进货不得超过最大限制
      if (updatedCount > maxiumCount) {
        updatedCount = maxiumCount;
        logger.info(`此次补货量超过作物 ${crop.name} 最大限值`);
      }
      await crop.update("onSaleCount", updatedCount);
    }
  }
}

/** 每周二、周四早 7:00 补充农场货架 */
export function startFarmlandReplenishCronTask() {
  return schedule.scheduleJob("0 0 7 * * 2,4", replenishFarmlandStore);
}
