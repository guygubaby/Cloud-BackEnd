import { Router } from "express";
import { Crops, Farmer } from "../db";
import { getCropsOnSaleList } from "../db/db-dao/crop-dao";
import { cropsData } from "../data/crops-init-data";
import { bindRouteHandler } from "../shared";
import { createLogger } from "../utils/logger";
import { respFailed, respSuccess } from "../utils/respProcess";

const logger = createLogger("Route Farmland");
export const farmlandRouter = Router();

// 初始化农场作物数据
bindRouteHandler(
  farmlandRouter,
  "POST",
  "/api/farmland/init-crops",
  async (_, res) => {
    try {
      await Promise.all(
        cropsData.map(async (crop) => {
          await Crops.create(crop);
        })
      );
      respSuccess(res, logger, { statusMsg: "初始化农场成功！" });
    } catch (err) {
      respFailed(res, logger, { err, msg: "初始化农场失败！" });
    }
  }
);
// 初始化农场耕种信息
bindRouteHandler(
  farmlandRouter,
  "POST",
  "/api/farmland/init-farmer",
  async (_, res) => {
    try {
      await Farmer.create({ name: "琳琳" });
      respSuccess(res, logger, { statusMsg: "初始化耕种者成功！" });
    } catch (err) {
      respFailed(res, logger, { err, msg: "初始化耕种者失败！" });
    }
  }
);
// 获取农场耕种信息
bindRouteHandler(
  farmlandRouter,
  "GET",
  "/api/farmland/status",
  async (req, res) => {
    try {
      let { name } = req.query;
      name = decodeURIComponent(name);
      logger.info(`🚀 正在查询耕种者 ${name} 的信息 ...`);
      const farmer = await Farmer.findOne({
        where: { name },
      });
      if (!farmer) {
        throw new Error(`没有找到耕种者 ${name} 的信息`);
      }
      respSuccess(res, logger, {
        statusMsg: `获取耕种者状态成功！`,
        data: farmer,
      });
    } catch (err) {
      respFailed(res, logger, { err, msg: "获取耕种者状态信息失败！" });
    }
  }
);
// 获取农场商店可出售列表
bindRouteHandler(
  farmlandRouter,
  "GET",
  "/api/farmland/on-sale",
  async (_, res) => {
    try {
      const crops = await getCropsOnSaleList();
      respSuccess(res, logger, {
        statusMsg: "获取农场商店出售表成功！",
        data: crops,
      });
    } catch (err) {
      respFailed(res, logger, { err, msg: "获取农场商店出售表失败！" });
    }
  }
);
// 购买农场作物
bindRouteHandler(
  farmlandRouter,
  "POST",
  "/api/farmland/buy-crop",
  async (req, res) => {
    const { cropId, cropName, count } = req.body;
    try {
      const farmer = await Farmer.findOne({ where: { name: "琳琳" } });
      if (!farmer) throw new Error("耕作者数据实体丢失！");
      const crop = await Crops.findOne({ where: { cropId, name: cropName } });
      if (!crop) throw new Error(`未找到作物 ${cropName} 的数据实体！`);

      if (farmer.coins < crop.price * count) {
        throw new Error("金币不足！");
      }
      await farmer.update({
        coins: farmer.coins - crop.price * count,
      });
      respSuccess(res, logger, { statusMsg: `购买 ${cropName} 成功！` });
    } catch (err) {
      respFailed(res, logger, { err, msg: `购买 ${cropName} 失败！` });
    }
  }
);
