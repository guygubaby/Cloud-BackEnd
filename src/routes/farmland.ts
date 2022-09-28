import express from "express";
import { Crops, Farmer } from "../db";
import { getCropsOnSaleList } from "../db-dao/crop-dao";
import { cropsData } from "../data/crops-init-data";
import { bindRouteHandler } from "../shared";
import type { Router } from "express";

export const farmlandRouter: Router = express.Router();

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
      res.json({
        statusMsg: "初始化农场成功！",
      });
    } catch (err) {
      res.status(400);
      res.json({
        statusMsg: "初始化农场失败！",
        errMsg: String(err),
      });
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
      res.json({
        statusMsg: "初始化耕种者成功！",
      });
    } catch (err) {
      res.status(400);
      res.json({
        statusMsg: "初始化耕种者失败！",
        errMsg: String(err),
      });
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
      const { name } = req.query;
      const farmer = await Farmer.findOne({
        where: { name },
      });
      if (!farmer) {
        throw new Error(`没有找到耕种者 ${name} 的信息`);
      }
      res.json({
        statusMsg: `获取耕种者状态成功！`,
        farmer,
      });
    } catch (err) {
      res.status(400);
      res.json({
        statusMsg: "获取耕种者状态信息失败！",
        errMsg: String(err),
      });
    }
  }
);
// 获取农场商店可出售列表
bindRouteHandler(
  farmlandRouter,
  "GET",
  "/api/farmland/on-sale",
  async (req, res) => {
    try {
      const crops = await getCropsOnSaleList();
      res.json({
        statusMsg: "获取农场商店出售表成功！",
        crops,
      });
    } catch (err) {
      res.status(400);
      res.json({
        statusMsg: "获取农场商店出售表失败！",
        errMsg: String(err),
      });
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
      res.json({
        statusMsg: `购买 ${cropName} 成功！`,
      });
    } catch (err) {
      res.status(400);
      res.json({
        statusMsg: `购买 ${cropName} 失败！`,
        errMsg: String(err),
      });
    }
  }
);
