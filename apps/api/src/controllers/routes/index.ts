import { Router } from "express";
import { getExchangeRatesHistory } from "../exchange-rates-history";

export const router: Router = Router();

router.get("/history", getExchangeRatesHistory);
router.post("/subscribe");
