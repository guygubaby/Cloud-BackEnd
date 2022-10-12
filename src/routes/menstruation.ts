import { Router } from "express";
import dayjs from "dayjs";
import { Menstruation } from "../db";
import { bindRouteHandler } from "../shared";
import { createLogger } from "../utils/logger";
import { respFailed, respSuccess } from "../utils/respProcess";

import "dayjs/plugin/utc";

const logger = createLogger("Route menstruation");
export const menstruationRouter = Router();

// 记录一次经期
bindRouteHandler(
  menstruationRouter,
  "POST",
  "/api/menstruation/record",
  async (req, res) => {
    const { start, end } = req.body;
    if (Number.isNaN(start) || Number.isNaN(end)) {
      respFailed(res, logger, {
        err: new Error("请求参数中的日期范围有误"),
        msg: "记录经期请求失败",
      });
      return;
    }

    const startDate = dayjs(start);
    const endDate = dayjs(end);
    try {
      await Menstruation.create({
        startTimestamp: start,
        endTimestamp: end,
      });
      respSuccess(res, logger, {
        statusMsg: `记录经期成功 ${startDate
          .utcOffset(0)
          .format("YYYY/MM/DD")} - ${endDate
          .utcOffset(0)
          .format("YYYY/MM/DD")}`,
      });
    } catch (err) {
      respFailed(res, logger, {
        err,
        msg: "记录经期请求失败",
      });
    }
  }
);
