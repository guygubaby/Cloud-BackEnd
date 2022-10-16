import type { Request } from "express";

export function useOpenId<R extends Request>(req: R) {
  const openId = req.headers["x-wx-openid"];
  if (!openId) {
    throw new Error("请求 header 中没有找到 openId");
  }
  return openId;
}
