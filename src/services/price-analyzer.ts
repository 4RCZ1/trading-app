import type BinanceApi from "./binance-api.js";
import type { Kline } from "./binance-api.js";

export type PriceDiff = {
  date: Date;
  diff: number;
};

export class PriceAnalyzer {
  private apiService: BinanceApi;
  constructor(apiService: BinanceApi) {
    this.apiService = apiService;
  };

  async getDailyPriceChanges(symbol: string) {
    const klines = await this.apiService.getKlines(symbol);
    const priceDiffs: PriceDiff[] = [];
    let lastKline: Kline | undefined;
    for (const kline of klines) {
      const priceDiff: PriceDiff = {
        date: new Date(kline.openTime),
        diff: 0,
      };
      if (lastKline) {
        priceDiff.diff = kline.highPrice - lastKline.highPrice;
      }
      lastKline = kline;
      priceDiffs.push(priceDiff);
    }
    return priceDiffs;
  }
}
