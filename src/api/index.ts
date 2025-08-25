import express from "express";

import type MessageResponse from "../interfaces/message-response.js";
import type { Kline } from "../services/binance-api.js";

import { getKlines, getMarketData, okTest } from "../services/binance-api.js";
import emojis from "./emojis.js";

const router = express.Router();

router.get<object, MessageResponse>("/", async (req, res) => {
  const okResponse = await okTest();
  console.warn("okResponse", okResponse);
  res.json({ ...okResponse, message: "ok" });
});

router.get<object, Response>("/market-data", async (req, res) => {
  const marketData = await getMarketData("BTCUSDT");
  console.warn("marketData", marketData);
  res.json(marketData);
});

router.get<object, Kline[]>("/klines", async (req, res) => {
  const marketData = await getKlines("BTCUSDT");
  console.warn("marketData", marketData);
  res.send(marketData);
});

router.use("/emojis", emojis);

export default router;
