import { NextFunction, Request, Response } from "express";
import redis from "@/config/redis-client";

export const getExchangeRatesHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const timeseries = await redis.json.get("currencyreminder:timeseries");

    res.status(200).json(timeseries);
  } catch (error) {
    next(error);
  }
};
