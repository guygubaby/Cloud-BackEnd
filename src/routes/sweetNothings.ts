import express from "express";
import { Sequelize } from "sequelize";
import { SweetNothings } from "../db";
import { bindRouteHandler } from "../shared";
import type { Router } from "express";

export const sweetNothingsRouter: Router = express.Router();

// 记录保存情话
bindRouteHandler(
  sweetNothingsRouter,
  "POST",
  "/api/sweet-nothings",
  async (req, res) => {
    const sentences = req.body.sentences ?? [];
    try {
      await Promise.all(
        sentences.map(async (sentence) => {
          const sweet = await SweetNothings.create({ sentence });
          console.log(`添加了一句情话：${sweet.sentence}`);
        })
      );
      res.json({ statusMsg: "添加情话成功！" });
    } catch (err) {
      res.status(400);
      res.json({ statusMsg: "添加情话失败！", errMsg: String(err) });
    }
  }
);
// 获取一句情话
bindRouteHandler(
  sweetNothingsRouter,
  "GET",
  "/api/sweet-nothings",
  async (_, res) => {
    try {
      const randomRecord = await SweetNothings.findOne({
        order: [Sequelize.literal("rand()")],
      });
      if (randomRecord?.sentence) {
        res.json({
          statusMsg: "获取情话成功！",
          sentence: randomRecord.sentence,
        });
      } else {
        throw new Error("情话记录没有 sentence 字段！");
      }
    } catch (err) {
      res.json({
        statusMsg: "获取情话失败！",
        errMsg: String(err),
      });
    }
  }
);
