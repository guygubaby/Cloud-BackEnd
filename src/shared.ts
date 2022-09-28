import type { RequestMetaMap } from "./types";
import type { RequestHandler, Router } from "express";

export function bindRouteHandler<P extends keyof RequestMetaMap>(
  router: Router,
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: P,
  ...handlers: Array<
    RequestHandler<
      P,
      any,
      Pick<RequestMetaMap[P], "body">["body"],
      Pick<RequestMetaMap[P], "query">["query"],
      Record<string, any>
    >
  >
) {
  // @ts-ignore
  router[method.toLowerCase()](path, ...handlers);
}

export const cropsMaxiumMap = new Map([
  [1, 100],
  [2, 100],
  [4, 80],
  [5, 80],
  [6, 40],
  [7, 40],
  [8, 30],
  [9, 30],
  [10, 20],
]);
