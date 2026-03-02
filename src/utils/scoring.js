export function calculateArchetype(answers) {
  const scores = { builder: 0, overthinker: 0, gambler: 0, protector: 0 };

  // Q1 overconfidence (index 0-3)
  const q1Map = [
    { gambler: 3 },
    { builder: 2 },
    { overthinker: 2, protector: 1 },
    { protector: 2 },
  ];
  if (answers[0] !== undefined) apply(scores, q1Map[answers[0]]);

  // Q2 emotion (array of up to 2 strings)
  const q2Map = {
    'Anxious':     { protector: 3 },
    'Excited':     { gambler: 3 },
    'In Control':  { builder: 3 },
    'Ashamed':     { protector: 2 },
    'Confused':    { overthinker: 4 },
    'Numb':        { protector: 1, overthinker: 1 },
  };
  if (Array.isArray(answers[1])) {
    answers[1].forEach((word) => { if (q2Map[word]) apply(scores, q2Map[word]); });
  }

  // Q3 power cut (index 0-3) + emergency flag read by Result only
  const q3Map = [
    { builder: 3 },
    { builder: 1, overthinker: 1 },
    { protector: 2 },
    { protector: 5 },
  ];
  if (answers[2] !== undefined) apply(scores, q3Map[answers[2]]);

  // Q4 literacy — NO archetype points. answers[3] = literacy string.

  // Q5 Marco (string key)
  const q5Map = {
    fomo:    { gambler: 3 },
    cautious:{ overthinker: 2 },
    pass:    { builder: 2 },
    froze:   { builder: 1, overthinker: 1 },
  };
  if (answers[4] && q5Map[answers[4]]) apply(scores, q5Map[answers[4]]);

  // Q6 dinner party (index 0-3) — new scoring
  const q6Map = [
    { gambler: 2 },   // Alex travel
    { gambler: 3 },   // Jordan money
    { builder: 3 },   // Sam mortgage
    { builder: 2 },   // Pat no worry
  ];
  if (answers[5] !== undefined) apply(scores, q6Map[answers[5]]);

  // Q7 crash canvas (string)
  const q7Map = { sell: { protector: 3 }, hold: { builder: 3 }, buy: { gambler: 4 } };
  if (answers[6] && q7Map[answers[6]]) apply(scores, q7Map[answers[6]]);

  // Q8 wrong decision (index 0-2)
  const q8Map = [
    { overthinker: 2 }, // figure out what missed
    { builder: 3 },     // feel it, move on
    { gambler: 2 },     // don't dwell
  ];
  if (answers[7] !== undefined) apply(scores, q8Map[answers[7]]);

  // Q9 dream (string label)
  const q9Map = {
    'Freedom':      { builder: 2 },
    'Security':     { protector: 2 },
    'Independence': { builder: 3 },
    'Knowledge':    { overthinker: 3 },
    'Legacy':       { builder: 3 },
    'Peace':        { protector: 3 },
  };
  if (answers[8] && q9Map[answers[8]]) apply(scores, q9Map[answers[8]]);

  // Determine winner with tie-breaking
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [winner] = sorted[0];
  const [second] = sorted[1];
  if (sorted[0][1] === sorted[1][1]) {
    const pair = new Set([winner, second]);
    if (pair.has('builder') && pair.has('overthinker')) return 'builder';
    if (pair.has('gambler') && pair.has('protector')) return 'protector';
  }
  return winner;
}

function apply(scores, map) {
  Object.entries(map).forEach(([k, v]) => { scores[k] += v; });
}
