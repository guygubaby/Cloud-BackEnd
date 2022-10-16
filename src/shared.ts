import type { RequestMetaMap } from "./types";
import type { RequestHandler, Router } from "express";

export const SequelizeConnectionRefusedErrorName =
  "SequelizeConnectionRefusedError";
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

// forked from 'express'
interface ParamsDictionary {
  [key: string]: string;
}
type RemoveTail<
  S extends string,
  Tail extends string
> = S extends `${infer P}${Tail}` ? P : S;
type GetRouteParameter<S extends string> = RemoveTail<
  RemoveTail<RemoveTail<S, `/${string}`>, `-${string}`>,
  `.${string}`
>;
type RouteParameters<Route extends string> = string extends Route
  ? ParamsDictionary
  : Route extends `${string}(${string}`
  ? ParamsDictionary //TODO: handling for regex parameters
  : Route extends `${string}:${infer Rest}`
  ? (GetRouteParameter<Rest> extends never
      ? ParamsDictionary
      : GetRouteParameter<Rest> extends `${infer ParamName}?`
      ? { [P in ParamName]?: string }
      : { [P in GetRouteParameter<Rest>]: string }) &
      (Rest extends `${GetRouteParameter<Rest>}${infer Next}`
        ? RouteParameters<Next>
        : unknown)
  : {};

export function bindRouteHandler<P extends keyof RequestMetaMap>(
  router: Router,
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: P,
  ...handlers: Array<
    RequestHandler<
      RouteParameters<P>,
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
