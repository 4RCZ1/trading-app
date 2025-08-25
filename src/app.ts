import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import type { PriceDiff } from "./services/price-analyzer.js";

import api from "./api/index.js";
import * as middlewares from "./middlewares.js";
import BinanceApi from "./services/binance-api.js";
import { PriceAnalyzer } from "./services/price-analyzer.js";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<object, PriceDiff[]>("/", async (req, res) => {
  const priceAnalyzer = new PriceAnalyzer(new BinanceApi());
  const priceDiffs = await priceAnalyzer.getDailyPriceChanges("BTCUSDT");
  res.json(priceDiffs);
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
