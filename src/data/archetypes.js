const ALT_FWRA_SSAC = {
  items: [
    { ticker: 'FWRA', name: 'Invesco FTSE All-World (0.15%)', why: 'Identical global exposure to VWCE at lower cost. Best swap if your broker doesn\'t list VWCE.' },
    { ticker: 'SSAC', name: 'iShares MSCI ACWI (0.20%)', why: 'All-world equivalent from iShares — same concept, larger fund house.' },
  ],
  note: 'US investors: VT (Vanguard Total World, 0.07%) — same concept, US-domiciled.',
};

const ALT_XEON_BUFFER = {
  items: [
    { ticker: 'XEON', name: 'Xtrackers Overnight Rate Swap (0.10%)', why: 'Parks your cash in overnight interbank rates while you build your buffer. Better than sitting idle.' },
  ],
  note: 'Once buffer is solid, move to VWCE — it will still be here.',
};

const ALT_IGLO_IBTS = {
  items: [
    { ticker: 'IGLO', name: 'iShares Global Government Bond (0.10%)', why: 'Government bonds only — more stable than AGGH, no corporate exposure.' },
    { ticker: 'IBTS', name: 'iShares Short-Term Government Bond (0.07%)', why: 'Short duration. Fastest to recover in rate moves — lowest volatility floor.' },
  ],
  note: 'Pre-built option: AOK (iShares Conservative Allocation) for US investors.',
};

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
      alternatives: ALT_FWRA_SSAC,
      isin: 'IE00B3RBWM25',
      aum: '~€20bn',
    },
    suitabilityEtf: {
      conservative: {
        ticker: 'Build your buffer first',
        name: 'Emergency Fund → then VWCE',
        description: 'Your mindset is right. Your foundation isn\'t there yet. Before the market, build 3 months of expenses in a high-yield savings account. Then come back to VWCE — it will still be here.',
        why: [
          'Investing without a buffer means you\'ll be forced to sell at the worst moment.',
          'The math only works if you don\'t interrupt it. A buffer is what makes that possible.',
          'This isn\'t a delay — it\'s the first step.',
        ],
        alternatives: ALT_XEON_BUFFER,
        isin: null,
        aum: null,
      },
      moderate: {
        ticker: 'VWCE 80% + AGGH 20%',
        name: 'Vanguard All-World + Global Bonds',
        description: 'Mostly equity for long-term growth, with a bond sleeve to reduce volatility. 80% of the global economy, anchored by 20% in investment-grade bonds.',
        why: [
          'Your horizon and foundation support equity — but the bond sleeve gives you stability.',
          'In a down year, the bond portion cushions. You won\'t need to sell the whole thing.',
          'As your foundation strengthens, you can shift toward 90/10 or 100% VWCE over time.',
        ],
        alternatives: {
          items: [
            { ticker: 'VNGA80', name: 'Vanguard LifeStrategy 80% Equity (0.25%)', why: 'Auto-rebalanced 80/20 in one fund. Less control, less maintenance — fits your preference for simplicity.' },
          ],
          note: null,
        },
        isin: 'IE00B3RBWM25 / IE00BDBRDM35',
        aum: '~€20bn / ~€12bn',
      },
      growth: {
        ticker: 'VWCE',
        name: 'Vanguard FTSE All-World Accumulating',
        description: '3,700 companies. 50 countries. One fund. You own a piece of the global economy — Apple, Toyota, Nestlé, Samsung. One decision. No maintenance.',
        why: [
          'You think long-term — this fund rewards exactly that.',
          'You dislike noise — this gives you nothing to tinker with.',
          'Your patience is your superpower here. Let it work.',
        ],
        alternatives: ALT_FWRA_SSAC,
        isin: 'IE00B3RBWM25',
        aum: '~€20bn',
      },
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
      alternatives: {
        items: [
          { ticker: 'SWRD', name: 'SPDR MSCI World (0.12%)', why: 'Same index as IWDA, 8bps cheaper. Less AUM but identical underlying — a defensible upgrade on cost.' },
          { ticker: 'EMIM', name: 'iShares MSCI EM IMI (0.18%)', why: 'Add 10% alongside 90% IWDA to capture emerging markets. Adds ~10% of global market cap you\'d otherwise skip.' },
        ],
        note: null,
      },
      isin: 'IE00B4L5Y983',
      aum: '~€80bn',
    },
    suitabilityEtf: {
      conservative: {
        ticker: 'IGLO or IBTS',
        name: 'Short-Duration Government Bonds',
        description: 'You\'re a careful thinker with a short horizon. The case for equities doesn\'t hold at this timescale. Short-duration government bonds give you real yield without meaningful volatility.',
        why: [
          'IGLO (iShares Global Govt Bond, 0.10%) — diversified government exposure, stable.',
          'IBTS (iShares Short-Term Govt, 0.07%) — even lower duration, faster to recover in rate moves.',
          'This is a studied, defensible choice. You\'ll be able to justify it to yourself.',
        ],
        alternatives: {
          items: [
            { ticker: 'IGLO', name: 'iShares Global Government Bond (0.10%)', why: 'Diversified government bond exposure. Stable and defensible across any rate environment.' },
            { ticker: 'IBTS', name: 'iShares Short-Term Government Bond (0.07%)', why: 'Shorter duration = faster recovery if rates move. Lowest volatility in the fixed income space.' },
          ],
          note: 'Once your horizon extends past 5 years, revisit IWDA.',
        },
        isin: 'IE00B3F81409 / IE00B14X4S71',
        aum: '~€3bn / ~€2bn',
      },
      moderate: {
        ticker: 'IWDA 70% + AGGH 30%',
        name: 'iShares MSCI World + Global Aggregate Bond',
        description: '70% in the benchmark index you\'ll have no problem defending. 30% in global investment-grade bonds to reduce the variance that makes you second-guess everything.',
        why: [
          'A 70/30 split means a 30% market drop only hits you as a 21% portfolio drop.',
          'The bond portion is liquid. If you need to revisit, you can rebalance without selling equities.',
          'This is a common institutional allocation. You can find 40 years of backtest data on it.',
        ],
        alternatives: {
          items: [
            { ticker: 'VNGA60', name: 'Vanguard LifeStrategy 60% Equity (0.25%)', why: 'Auto-rebalanced 60/40 in one fund. No tinkering required — the allocation is maintained automatically.' },
          ],
          note: null,
        },
        isin: 'IE00B4L5Y983 / IE00BDBRDM35',
        aum: '~€80bn / ~€12bn',
      },
      growth: {
        ticker: 'IWDA',
        name: 'iShares Core MSCI World',
        description: 'The benchmark everything else is measured against. 1,600 large and mid-cap companies across 23 developed markets. Removes the \'what if there\'s something better\' loop — because this is the benchmark.',
        why: [
          'Your self-knowledge is high — this choice will survive your own scrutiny.',
          'Simple enough that there\'s nothing to second-guess once set up.',
          'It\'s the most studied ETF in existence. You\'ve already read about it.',
        ],
        alternatives: {
          items: [
            { ticker: 'SWRD', name: 'SPDR MSCI World (0.12%)', why: 'Same index as IWDA, 8bps cheaper. Less AUM but identical underlying — a defensible upgrade on cost.' },
            { ticker: 'EMIM', name: 'iShares MSCI EM IMI (0.18%)', why: 'Add 10% alongside 90% IWDA to capture emerging markets. Adds ~10% of global market cap you\'d otherwise skip.' },
          ],
          note: null,
        },
        isin: 'IE00B4L5Y983',
        aum: '~€80bn',
      },
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
      alternatives: {
        items: [
          { ticker: 'EQQQ', name: 'Invesco Nasdaq-100 (0.30%)', why: 'More concentrated than S&P 500 — heavier tech, higher volatility. Only with the cash buffer firmly in place.' },
        ],
        note: 'US investors: VOO or IVV (0.03%) — same S&P 500 exposure, US-domiciled.',
      },
      isin: 'IE00B5BMR087',
      aum: '~€50bn',
    },
    suitabilityEtf: {
      conservative: {
        ticker: 'Not yet.',
        name: 'Stabilise before you invest',
        description: 'Your instincts are aggressive. Your situation right now calls for something different. Before you take market risk, your foundation needs to hold. Equities can wait — a crisis can\'t.',
        why: [
          'Without a buffer, you\'ll be forced to sell in a crash at the worst possible time.',
          'High-yield savings or XEON (overnight rate ETF, 0.10%) give you real return while you build.',
          'When your foundation is solid, VWCE or CSPX will still be there.',
        ],
        alternatives: {
          items: [
            { ticker: 'XEON', name: 'Xtrackers Overnight Rate Swap (0.10%)', why: 'Real return while you stabilise. Better than holding cash idle — and no market risk.' },
            { ticker: 'AGGH', name: 'iShares Global Aggregate Bond (0.10%)', why: 'Low volatility, real yield. Intermediate step while you build your financial foundation.' },
          ],
          note: 'When your foundation is solid, VWCE or CSPX will still be there.',
        },
        isin: null,
        aum: null,
      },
      moderate: {
        ticker: 'VWCE',
        name: 'Vanguard FTSE All-World Accumulating',
        description: 'Your energy belongs in a proven engine, not a concentrated bet. VWCE gives you 3,700 companies across 50 countries. Plenty of story — without the US-concentration risk of the S&P 500.',
        why: [
          'At your current stage, global diversification reduces the chance of a single-region shock wiping you out.',
          'Your horizon and foundation support equity — but CSPX is too concentrated for now.',
          'As your situation strengthens, you can rotate toward a more focused allocation.',
        ],
        alternatives: {
          items: [
            { ticker: 'FWRA', name: 'Invesco FTSE All-World (0.15%)', why: 'VWCE equivalent at slightly lower cost. Same global exposure.' },
            { ticker: 'SSAC', name: 'iShares MSCI ACWI (0.20%)', why: 'All-world from iShares. Good if VWCE or FWRA unavailable at your broker.' },
          ],
          note: null,
        },
        isin: 'IE00B3RBWM25',
        aum: '~€20bn',
      },
      growth: {
        ticker: 'CSPX + 20% Cash',
        name: 'iShares Core S&P 500 (80%) + Cash Buffer',
        description: '80% in the most validated growth story on earth. 20% held as cash — not for tips. That buffer is your seatbelt. It stops you panic-selling in a dip because you already have dry powder.',
        why: [
          'Channels your optimism into a proven growth engine.',
          '500 biggest US companies — plenty of story, no single-stock risk.',
          'The cash buffer satisfies your action instinct without burning your core.',
        ],
        alternatives: {
          items: [
            { ticker: 'EQQQ', name: 'Invesco Nasdaq-100 (0.30%)', why: 'More concentrated than S&P 500 — heavier tech, higher volatility. Only with the cash buffer firmly in place.' },
          ],
          note: 'US investors: VOO or IVV (0.03%) — same S&P 500 exposure, US-domiciled.',
        },
        isin: 'IE00B5BMR087',
        aum: '~€50bn',
      },
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
      alternatives: ALT_IGLO_IBTS,
      isin: 'IE00BDBRDM35',
      aum: '~€12bn',
    },
    suitabilityEtf: {
      conservative: {
        ticker: 'AGGH 90% + VWCE 10%',
        name: 'Bonds-first, equity toe-dip',
        description: '90% in global investment-grade bonds. A small 10% equity sleeve — just enough to stay connected to growth without the volatility that keeps you up at night.',
        why: [
          'Your horizon and foundation call for capital preservation first.',
          'The 10% VWCE sleeve is your inflation defense. Without it, \'safe\' costs you money silently.',
          'This is a floor you can stand on with full confidence.',
        ],
        alternatives: ALT_IGLO_IBTS,
        isin: 'IE00BDBRDM35 / IE00B3RBWM25',
        aum: '~€12bn / ~€20bn',
      },
      moderate: {
        ticker: 'AGGH + VWCE 70/30',
        name: 'iShares Global Aggregate Bond + Vanguard All-World',
        description: '70% in global investment-grade bonds — stable, diversified, low volatility. 30% in global equities for measured growth. A floor you can stand on while still building. Not exciting. That\'s the entire point.',
        why: [
          'Bonds first means you sleep at night — the number doesn\'t swing wildly.',
          'The equity sleeve grows something without making you feel exposed.',
          '70/30 is a starting point you can own with confidence.',
        ],
        alternatives: ALT_IGLO_IBTS,
        isin: 'IE00BDBRDM35',
        aum: '~€12bn',
      },
      growth: {
        ticker: 'AGGH + VWCE 50/50',
        name: 'Balanced — Bonds + Global Equity',
        description: 'Your long horizon means you can afford more equity than you think. 50% bonds keep the floor — 50% VWCE means your wealth actually grows. This is more balanced than it feels.',
        why: [
          'With a long horizon, time works in your favor. Volatility becomes less dangerous.',
          'The 50% bond allocation still gives you a floor to stand on in a downturn.',
          'Inflation at 3.5% per year quietly destroys a bonds-only portfolio over 20 years.',
        ],
        alternatives: {
          items: [
            { ticker: 'VNGA40', name: 'Vanguard LifeStrategy 40% Equity (0.25%)', why: 'Auto-rebalanced 40/60 — built-in discipline, no annual rebalancing needed.' },
            { ticker: 'IGLO', name: 'iShares Global Government Bond (0.10%)', why: 'If you prefer pure government bonds over the corporate-mixed AGGH.' },
          ],
          note: 'Consider moving to 60/40 as your confidence builds over time.',
        },
        isin: 'IE00BDBRDM35 / IE00B3RBWM25',
        aum: '~€12bn / ~€20bn',
      },
    },
    trap: 'You\'ll feel smart when markets drop and your bonds hold steady. Then you\'ll watch everything recover without you and move the goalposts — \'I\'ll invest more when it\'s more stable.\' It never feels stable enough.',
    rules: [
      { n: 1, text: 'Playing it safe is also a risk. I remind myself every quarter.' },
      { n: 2, text: 'My allocation is fixed. I rebalance annually. Not based on news.' },
      { n: 3, text: 'Inflation is silent. I check my return against it once per year.' },
    ],
  },
};
