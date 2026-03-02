export function calculateArchetype(answers) {
  const scores = { builder: 0, overthinker: 0, gambler: 0, protector: 0 };
  let suitabilityScore = 0;

  // Q1 overconfidence (index 0-3)
  const q1Map = [
    { gambler: 3 },
    { builder: 2 },
    { overthinker: 2, protector: 1 },
    { protector: 2 },
  ];
  if (answers[0] !== undefined) apply(scores, q1Map[answers[0]]);

  // Q2 emotion (array of up to 2 strings) — now at index 4
  const q2Map = {
    'Anxious':     { protector: 3 },
    'Excited':     { gambler: 3 },
    'In Control':  { builder: 3 },
    'Ashamed':     { protector: 2 },
    'Confused':    { overthinker: 3 },
    'Numb':        { protector: 1, overthinker: 1 },
  };
  if (Array.isArray(answers[4])) {
    answers[4].forEach((word) => { if (q2Map[word]) apply(scores, q2Map[word]); });
  }

  // Q3 power cut (index 0-3) — feeds both archetype and suitability
  const q3ArchetypeMap = [
    { builder: 3 },
    { builder: 1, overthinker: 1 },
    { protector: 2 },
    { protector: 5 },
  ];
  const q3SuitabilityMap = [3, 1, 0, -2];
  if (answers[2] !== undefined) {
    apply(scores, q3ArchetypeMap[answers[2]]);
    suitabilityScore += q3SuitabilityMap[answers[2]];
  }

  // Q4 literacy — NO archetype points. answers[1] = literacy string.

  // Q5 Marco (string key) — now at index 6
  const q5Map = {
    fomo:    { gambler: 3 },
    cautious:{ overthinker: 2 },
    pass:    { builder: 2 },
    froze:   { builder: 1, overthinker: 1 },
  };
  if (answers[6] && q5Map[answers[6]]) apply(scores, q5Map[answers[6]]);

  // Q6 dinner party (index 0-3) — stays at index 5
  const q6Map = [
    { gambler: 2 },   // Alex travel
    { gambler: 3 },   // Jordan money
    { builder: 3 },   // Sam mortgage
    { builder: 2 },   // Pat no worry
  ];
  if (answers[5] !== undefined) apply(scores, q6Map[answers[5]]);

  // Q7 crash canvas (string) — now at index 7
  const q7Map = { sell: { protector: 3 }, hold: { builder: 3 }, buy: { gambler: 4 } };
  if (answers[7] && q7Map[answers[7]]) apply(scores, q7Map[answers[7]]);

  // Q8 wrong decision (index 0-2) — now at index 8
  const q8Map = [
    { overthinker: 2 },
    { builder: 3 },
    { gambler: 2 },
  ];
  if (answers[8] !== undefined) apply(scores, q8Map[answers[8]]);

  // QHoldings (array of strings) — now at index 3
  const holdingsArchetypeMap = {
    savings_cash: { protector: 1 },
    index_etf:    { builder: 2 },
    bonds:        { protector: 1 },
    stocks:       { gambler: 1, overthinker: 1 },
    reits:        { builder: 1 },
    crypto_alt:   { gambler: 2 },
  };
  const holdingsSuitabilityMap = {
    savings_cash: 1,
    index_etf:    2,
    bonds:        1,
    stocks:       1,
    reits:        1,
    crypto_alt:   0,
  };
  if (Array.isArray(answers[3])) {
    answers[3].forEach((key) => {
      if (holdingsArchetypeMap[key]) apply(scores, holdingsArchetypeMap[key]);
      if (holdingsSuitabilityMap[key] !== undefined) suitabilityScore += holdingsSuitabilityMap[key];
    });
  }

  // QTimeHorizon (string, index 9)
  const horizonArchetypeMap = {
    '1yr':   { protector: 1, overthinker: 1 },
    '3yr':   { protector: 1 },
    '5yr':   { builder: 1 },
    '10yr':  { builder: 2 },
    '20yr':  { builder: 2 },
    '30yr+': { builder: 3 },
  };
  const horizonSuitabilityMap = {
    '1yr':   -1,
    '3yr':   0,
    '5yr':   1,
    '10yr':  2,
    '20yr':  3,
    '30yr+': 3,
  };
  if (answers[9] && horizonArchetypeMap[answers[9]]) {
    apply(scores, horizonArchetypeMap[answers[9]]);
    suitabilityScore += horizonSuitabilityMap[answers[9]];
  }

  // Determine archetype winner with tie-breaking
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [winner] = sorted[0];
  const [second] = sorted[1];
  let archetype = winner;
  if (sorted[0][1] === sorted[1][1]) {
    const pair = new Set([winner, second]);
    if (pair.has('builder') && pair.has('overthinker')) archetype = 'builder';
    else if (pair.has('gambler') && pair.has('protector')) archetype = 'protector';
  }

  // Determine suitability band
  let suitability;
  if (suitabilityScore <= 1) suitability = 'conservative';
  else if (suitabilityScore <= 4) suitability = 'moderate';
  else suitability = 'growth';

  return { archetype, suitability };
}

function apply(scores, map) {
  Object.entries(map).forEach(([k, v]) => { scores[k] += v; });
}
