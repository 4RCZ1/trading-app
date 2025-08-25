import express from "express";

import type MessageResponse from "../interfaces/message-response.js";
import type { Kline } from "../services/binance-api.js";

import BinanceApi from "../services/binance-api.js";
import emojis from "./emojis.js";

const router = express.Router();

router.get<object, MessageResponse>("/", async (req, res) => {
  const okResponse = await BinanceApi.okTest();
  console.warn("okResponse", okResponse);
  res.json({ ...okResponse, message: "ok" });
});

router.get<object, Response>("/market-data", async (req, res) => {
  const marketData = await BinanceApi.getMarketData("BTCUSDT");
  console.warn("marketData", marketData);
  res.json(marketData);
});

router.get<object, Kline[]>("/klines", async (req, res) => {
  const marketData = await BinanceApi.getKlines("BTCUSDT");
  console.warn("marketData", marketData);
  res.send(marketData);
});

router.use("/emojis", emojis);

export default router;
