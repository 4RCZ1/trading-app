const BASE_URL = "https://api.binance.com";

export async function okTest() {
  return fetch(BASE_URL);
}

export async function getMarketData(symbol: string) {
  const path = new URL(`${BASE_URL}/api/v3/depth`);
  path.searchParams.set("symbol", symbol);
  return fetch(path, {});
}
