import { NextFunction, Request, Response } from "express";
import redis from "@repo/redis";

export const getExchangeRatesHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const timeseries = await redis.get("currencyreminder:timeseries");
    if (!timeseries) return res.sendStatus(404);

    res.status(200).json(JSON.parse(timeseries));
  } catch (error) {
    next(error);
  }
};
