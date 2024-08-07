import { db } from "@repo/db";
import { NextFunction, Request, Response } from "express";

export const subscribe = async (req: Request, res: Response, next: NextFunction) => {
  const { email, target } = req.body;

  try {
    await db.subscriber.upsert({ where: { email }, create: { email, target }, update: { target } });

    res.status(201).json({ message: "Subscribed Successfully, We will reach you every time USD reaches your target." });
  } catch (error) {
    next(error);
  }
};
