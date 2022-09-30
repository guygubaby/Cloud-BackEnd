import { Sequelize } from "@sequelize/core";
import { Router } from "express";
import { SweetNothings } from "../db";
import { bindRouteHandler } from "../shared";
import { createLogger } from "../utils/logger";
import { respFailed, respSuccess } from "../utils/respProcess";

const logger = createLogger("Route SweetNothings");
export const sweetNothingsRouter = Router();

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
          logger.info(`添加了一句情话：${sweet.sentence}`);
        })
      );
      respSuccess(res, logger, { statusMsg: "添加情话成功！" });
    } catch (err) {
      respFailed(res, logger, { err, msg: "添加情话失败！" });
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
        respSuccess(res, logger, {
          statusMsg: "获取情话成功！",
          data: {
            sentence: randomRecord.sentence,
          },
        });
      } else {
        throw new Error("情话记录没有 sentence 字段！");
      }
    } catch (err) {
      respFailed(res, logger, { err, msg: "获取情话失败！" });
    }
  }
);
