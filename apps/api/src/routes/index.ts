import { Router } from "express";
import { getExchangeRatesHistory } from "../controllers/exchange-rates-history";
import { subscribe } from "../controllers/subscribe";

export const router: Router = Router();

router.get("/history", getExchangeRatesHistory);
router.post("/subscribe", subscribe);
