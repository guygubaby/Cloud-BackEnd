import { Router } from "express";
import dayjs from "dayjs";
import { Menstruation } from "../db";
import { bindRouteHandler } from "../shared";
import { createLogger } from "../utils/logger";
import { respFailed, respSuccess } from "../utils/respProcess";

import "dayjs/plugin/utc";

const logger = createLogger("Route menstruation");
export const menstruationRouter = Router();
const monthStrRegExp = /^\d{4}-\d{2}$/;

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
        monthStr: startDate.format("YYYY-MM"),
        startTimestamp: start,
        endTimestamp: end,
      });
      respSuccess(res, logger, {
        statusMsg: `记录经期成功 ${startDate
          .utcOffset(8)
          .format("YYYY/MM/DD")} - ${endDate
          .utcOffset(8)
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
// 获取某月经期范围
bindRouteHandler(
  menstruationRouter,
  "GET",
  "/api/menstruation/record",
  async (req, res) => {
    const { monthStr } = req.query;
    if (!monthStrRegExp.test(monthStr)) {
      respFailed(res, logger, {
        err: new Error("请求参数中的月份格式有误"),
        msg: "查询经期请求失败",
      });
      return;
    }

    try {
      const found = await Menstruation.findOne({
        where: {
          monthStr,
        },
      });
      if (found !== null) {
        const { startTimestamp, endTimestamp } = found;
        respSuccess(res, logger, {
          statusMsg: `获取 ${monthStr} 经期范围成功`,
          data: {
            startTimestamp,
            endTimestamp,
          },
        });
      }
    } catch (err) {
      respFailed(res, logger, {
        err,
        msg: `获取 ${monthStr} 经期范围失败`,
      });
    }
  }
);
