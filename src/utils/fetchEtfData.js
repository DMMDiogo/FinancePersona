const YAHOO_SYMBOLS = {
  VWCE: 'VWCE.DE',
  IWDA: 'IWDA.AS',
  CSPX: 'CSPX.L',
  AGGH: 'AGGH.L',
  IGLO: 'IGLO.L',
  IBTS: 'IBTS.L',
  XEON: 'XEON.DE',
  FWRA: 'FWRA.L',
};

function extractPrimaryTicker(tickerString) {
  if (!tickerString) return null;
  const match = tickerString.match(/^([A-Z]{2,5})/);
  return match ? match[1] : null;
}

function formatCurrencySymbol(currency) {
  if (currency === 'GBp') return 'p';
  if (currency === 'GBP') return '£';
  if (currency === 'USD') return '$';
  return '€';
}

export async function fetchEtfData(tickerString) {
  const primary = extractPrimaryTicker(tickerString);
  if (!primary) return null;

  const yahooSymbol = YAHOO_SYMBOLS[primary];
  if (!yahooSymbol) return null;

  try {
    const res = await fetch(`/api/etf/${yahooSymbol}`);
    if (!res.ok) return null;

    const data = await res.json();
    const chart = data?.chart?.result?.[0];
    if (!chart) return null;

    const price = chart.meta?.regularMarketPrice;
    const currency = chart.meta?.currency;
    const dayChange = chart.meta?.regularMarketChangePercent;

    const closes = chart.indicators?.quote?.[0]?.close?.filter(Boolean) ?? [];
    const yearReturn =
      closes.length > 1
        ? ((closes[closes.length - 1] - closes[0]) / closes[0]) * 100
        : null;

    if (price == null) return null;

    return {
      price,
      currency,
      currencySymbol: formatCurrencySymbol(currency),
      dayChange: dayChange ?? null,
      yearReturn,
    };
  } catch {
    return null;
  }
}
