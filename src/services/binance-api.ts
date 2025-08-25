const BASE_URL = "https://api.binance.com";

export async function okTest() {
  return fetch(BASE_URL);
}

export async function getMarketData(symbol: string) {
  const path = new URL(`${BASE_URL}/api/v3/depth`);
  path.searchParams.set("symbol", symbol);
  return fetch(path, {});
}

export type Kline = {
  openTime: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  closeTime: number;
};

export async function getKlines(symbol: string, interval: string = "1d"): Promise<Kline[]> {
  const path = new URL(`${BASE_URL}/api/v3/klines`);
  path.searchParams.set("symbol", symbol);
  path.searchParams.set("interval", interval);
  const result = await (await fetch(path, {})).json();
  return result.map((rawObject: any): Kline => (
    {
      openTime: rawObject[0],
      openPrice: rawObject[1],
      highPrice: rawObject[2],
      lowPrice: rawObject[3],
      closePrice: rawObject[4],
      closeTime: rawObject[6],
    }
  ));
}
