import type { Response } from "express";
import type { Logger } from "log4js";

export function respSuccess<D extends object>(
  res: Response,
  logger: Logger,
  {
    statusMsg = "",
    data,
  }: {
    statusMsg: string;
    data?: D;
  }
) {
  logger.info(statusMsg);
  res.status(200).json({
    statusMsg,
    ...data,
  });
}

export function respFailed(
  res: Response,
  logger: Logger,
  {
    err = {} as any,
    msg = "",
    statusCode = 400,
  }: {
    err: any;
    msg: string;
    statusCode?: number;
  }
) {
  const errMsg = `${msg} ${err}`;
  logger.error(errMsg);
  res.status(statusCode).json({
    statusMsg: msg,
    errMsg,
  });
}
