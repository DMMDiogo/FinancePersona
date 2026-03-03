const VALID_INTERVALS = new Set(['1d', '1wk', '1mo']);
const VALID_RANGES = new Set(['1mo', '3mo', '6mo', '1y', '2y', '5y']);

export default async function handler(req, res) {
  const { symbol, interval = '1d', range = '1y' } = req.query;

  if (!symbol || !/^[A-Z0-9.]{2,12}$/.test(symbol)) {
    return res.status(400).json({ error: 'Invalid symbol' });
  }

  if (!VALID_INTERVALS.has(interval) || !VALID_RANGES.has(range)) {
    return res.status(400).json({ error: 'Invalid interval or range' });
  }

  try {
    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json,text/plain,*/*',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Upstream error' });
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Fetch failed' });
  }
}
