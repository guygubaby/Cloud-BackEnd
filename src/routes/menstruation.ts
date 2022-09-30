import { Router } from "express";
import dayjs from "dayjs";
import { Menstruation } from "../db";
import { bindRouteHandler } from "../shared";
import { createLogger } from "../utils/logger";
import { respFailed } from "../utils/respProcess";

const logger = createLogger("Route menstruation");
export const menstruationRouter = Router();

// 记录一次经期
bindRouteHandler(
  menstruationRouter,
  "POST",
  "/api/menstruation/record",
  async (req, res) => {
    const { start, end } = req.body;
    try {
      await Menstruation.create({
        startDate: dayjs(start).toDate(),
        endDate: dayjs(end).toDate(),
      });
    } catch (err) {
      respFailed(res, logger, {
        err,
        msg: "记录经期请求失败",
      });
    }
  }
);
