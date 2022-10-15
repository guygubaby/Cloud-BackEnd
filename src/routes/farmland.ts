import { Router } from "express";
import { Crops, Farmer, FarmerCrops } from "../db";
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
// 获取农场耕种信息
bindRouteHandler(
  farmlandRouter,
  "GET",
  "/api/farmland/status",
  async (req, res) => {
    try {
      const openId = req.headers["x-wx-openid"] as string;
      const farmer = await Farmer.findOne({
        where: { openId },
      });
      if (!farmer) {
        throw new Error(`没有找到当前登录用户的耕种者的信息`);
      }
      respSuccess(res, logger, {
        statusMsg: `获取耕种者状态成功！`,
        data: { farmer },
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
        data: { crops },
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
    const openId = req.headers["x-wx-openid"] as string;
    try {
      const farmer = await Farmer.findOne({ where: { openId } });
      if (!farmer) throw new Error("没有找到当前登录用户的耕作者数据实体！");
      const crop = await Crops.findOne({ where: { cropId, name: cropName } });
      if (!crop) throw new Error(`未找到作物 ${cropName} 的数据实体！`);
      if (farmer.coins < crop.price * count) {
        throw new Error("金币不足！");
      }

      // 找到耕作者的作物信息
      const farmerCrop = await FarmerCrops.findOne({
        where: { CropId: crop.id, FarmerId: farmer.id },
      });

      // 更新耕种者持有作物的数量
      if (farmerCrop) {
        farmerCrop.count += count;
        await farmerCrop.save();
      } else {
        await FarmerCrops.create({
          CropId: crop.id,
          FarmerId: farmer.id,
          count,
        });
      }

      // 更新作物的在售数量
      crop.onSaleCount -= count;
      await crop.save();

      // 更新耕作者金币
      await farmer.update({
        coins: farmer.coins - crop.price * count,
      });
      respSuccess(res, logger, {
        statusMsg: `购买 ${count} 份 ${cropName} 成功！`,
      });
    } catch (err) {
      respFailed(res, logger, { err, msg: `购买 ${cropName} 失败！` });
    }
  }
);
