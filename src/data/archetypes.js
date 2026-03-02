export const ARCHETYPES = {
  builder: {
    name: 'The Quiet Builder',
    quote: 'You don\'t make noise. You make progress.\nWhile others react, you let time do its work.',
    radarScores: { risk: 5, patience: 9, resilience: 8, discipline: 8, influence: 2, selfKnow: 7 },
    etf: {
      ticker: 'VWCE',
      name: 'Vanguard FTSE All-World Accumulating',
      description: '3,700 companies. 50 countries. One fund. You own a piece of the global economy — Apple, Toyota, Nestlé, Samsung. One decision. No maintenance.',
      why: [
        'You think long-term — this fund rewards exactly that.',
        'You dislike noise — this gives you nothing to tinker with.',
        'Your patience is your superpower here. Let it work.',
      ],
      alternatives: 'If VWCE unavailable: FWRA (Invesco, 0.15%), SSAC (iShares, 0.20%), or VT for US investors (0.07%)',
      isin: 'IE00B3RBWM25',
      aum: '~€20bn',
    },
    trap: 'Somewhere around month 4 or 5, life will interrupt. A big expense, a busy period, and you\'ll pause the auto-invest \'just for now.\' That pause is where most Quiet Builders lose their compounding edge. Set it up so that pausing requires more deliberate effort than continuing.',
    rules: [
      { n: 1, text: 'I review my portfolio once per quarter. Not monthly. Not weekly. Once per quarter.' },
      { n: 2, text: 'When I feel the urge to change something, I write it down and revisit in 30 days.' },
      { n: 3, text: 'My contribution is automatic. Cancelling requires three deliberate steps.' },
    ],
  },

  overthinker: {
    name: 'The Careful Analyst',
    quote: 'You see every angle before you move.\nThe problem is — you never stop seeing angles.',
    radarScores: { risk: 3, patience: 6, resilience: 4, discipline: 5, influence: 4, selfKnow: 9 },
    etf: {
      ticker: 'IWDA',
      name: 'iShares Core MSCI World',
      description: 'The benchmark everything else is measured against. 1,600 large and mid-cap companies across 23 developed markets. Removes the \'what if there\'s something better\' loop — because this is the benchmark.',
      why: [
        'Your self-knowledge is high — this choice will survive your own scrutiny.',
        'Simple enough that there\'s nothing to second-guess once set up.',
        'It\'s the most studied ETF in existence. You\'ve already read about it.',
      ],
      alternatives: 'Cheaper option: SWRD (SPDR MSCI World, 0.12%). Want EM too? Add EMIM 10% alongside IWDA 90%.',
      isin: 'IE00B4L5Y983',
      aum: '~€80bn',
    },
    trap: 'You won\'t make a bad decision. You\'ll make no decision. And while you\'re comparing fund A to fund B for the fourth month in a row, inflation is quietly making that choice for you. The research phase is over.',
    rules: [
      { n: 1, text: 'I have chosen. The research phase is over. Future research is just noise.' },
      { n: 2, text: 'I am allowed one portfolio review per quarter. Reviews are read-only — no changes that day.' },
      { n: 3, text: 'To switch funds I must write a one-page case. If I can\'t write it, I don\'t switch.' },
    ],
  },

  gambler: {
    name: 'The Momentum Rider',
    quote: 'You move fast and you feel alive doing it.\nThe market rewards this — until it doesn\'t.',
    radarScores: { risk: 9, patience: 3, resilience: 3, discipline: 4, influence: 9, selfKnow: 3 },
    etf: {
      ticker: 'CSPX + 20% Cash',
      name: 'iShares Core S&P 500 (80%) + Cash Buffer',
      description: '80% in the most validated growth story on earth. 20% held as cash — not for tips. That buffer is your seatbelt. It stops you panic-selling in a dip because you already have dry powder.',
      why: [
        'Channels your optimism into a proven growth engine.',
        '500 biggest US companies — plenty of story, no single-stock risk.',
        'The cash buffer satisfies your action instinct without burning your core.',
      ],
      alternatives: 'Want more concentration: EQQQ (Nasdaq-100, 0.30%). Lowest S&P 500 cost: SPYL (0.03%). US investors: VOO or IVV (0.03%).',
      isin: 'IE00B5BMR087',
      aum: '~€50bn',
    },
    trap: 'You\'ll hear a story that makes perfect sense. It\'ll be about AI, or energy, or some country everyone\'s suddenly talking about. It will feel different from the last time. It won\'t be. The excitement is not research.',
    rules: [
      { n: 1, text: 'I am not allowed to buy anything I discovered less than 14 days ago.' },
      { n: 2, text: 'My cash buffer is a seatbelt. It is not dry powder for tips.' },
      { n: 3, text: 'When I want to sell in a crash, I contact someone I trust first. No action until they reply.' },
    ],
  },

  protector: {
    name: 'The Cautious Guardian',
    quote: 'You built walls before you built anything else.\nNow you need to make sure the walls aren\'t the ceiling.',
    radarScores: { risk: 2, patience: 6, resilience: 3, discipline: 8, influence: 4, selfKnow: 5 },
    etf: {
      ticker: 'AGGH + VWCE 70/30',
      name: 'iShares Global Aggregate Bond + Vanguard All-World',
      description: '70% in global investment-grade bonds — stable, diversified, low volatility. 30% in global equities for measured growth. A floor you can stand on while still building. Not exciting. That\'s the entire point.',
      why: [
        'Bonds first means you sleep at night — the number doesn\'t swing wildly.',
        'The equity sleeve grows something without making you feel exposed.',
        '70/30 is a starting point you can own with confidence.',
      ],
      alternatives: 'Pre-built option: AOK (iShares Conservative Allocation, 0.15%). Government bonds only: IGLO (0.10%). Short-duration: IBTS (0.07%).',
      isin: 'IE00BDBRDM35',
      aum: '~€12bn',
    },
    trap: 'You\'ll feel smart when markets drop and your bonds hold steady. Then you\'ll watch everything recover without you and move the goalposts — \'I\'ll invest more when it\'s more stable.\' It never feels stable enough.',
    rules: [
      { n: 1, text: 'Playing it safe is also a risk. I remind myself every quarter.' },
      { n: 2, text: 'My 70/30 split is fixed. I rebalance annually. Not based on news.' },
      { n: 3, text: 'Inflation is silent. I check my return against it once per year.' },
    ],
  },
};
