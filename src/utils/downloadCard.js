import { SPRITES, drawSprite } from '../data/pixelSprites';

const AXES = ['Risk', 'Patience', 'Resilience', 'Discipline', 'Influence', 'Self-Know.'];
const AXIS_KEYS = ['risk', 'patience', 'resilience', 'discipline', 'influence', 'selfKnow'];

const ACCENT = {
  builder:     '#00f5ff',
  gambler:     '#f5c842',
  overthinker: '#a78bfa',
  protector:   '#00ff88',
};

// Draw the background grid overlay (same as CSS)
function drawGrid(ctx, w, h) {
  ctx.strokeStyle = 'rgba(0,245,255,0.04)';
  ctx.lineWidth = 1;
  const step = 60;
  for (let x = 0; x <= w; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y <= h; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
}

// Wrap text to fit maxWidth, returns array of lines
function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function downloadResultCard(archetypeKey, archetypeData) {
  const W = 1200;
  const H = 630;
  const accent = ACCENT[archetypeKey] ?? '#00f5ff';

  const canvas = document.createElement('canvas');
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  // ── Background ──────────────────────────────────────────
  ctx.fillStyle = '#060608';
  ctx.fillRect(0, 0, W, H);
  drawGrid(ctx, W, H);

  // ── Left column: pixel sprite ────────────────────────────
  const spriteColW = 360;
  const { grid, palette } = SPRITES[archetypeKey] ?? SPRITES.builder;
  const GRID_W = 20;
  const GRID_H = 28;
  const cellSize = 12; // 12px per cell → sprite 240×336px
  const spriteW = GRID_W * cellSize;
  const spriteH = GRID_H * cellSize;
  const spriteX = Math.floor((spriteColW - spriteW) / 2);
  const spriteY = Math.floor((H - spriteH) / 2);
  drawSprite(ctx, grid, palette, cellSize, spriteX, spriteY);

  // ── Glow behind sprite ───────────────────────────────────
  const grd = ctx.createRadialGradient(
    spriteColW / 2, H / 2, 20,
    spriteColW / 2, H / 2, 200,
  );
  grd.addColorStop(0, `${accent}18`);
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, spriteColW, H);

  // Redraw sprite on top of glow
  drawSprite(ctx, grid, palette, cellSize, spriteX, spriteY);

  // ── Vertical divider ─────────────────────────────────────
  const divX = spriteColW + 20;
  ctx.fillStyle = `${accent}30`;
  ctx.fillRect(divX, 40, 1, H - 80);

  // ── Right column ─────────────────────────────────────────
  const rx = divX + 40;
  const rw = W - rx - 48;
  let ry = 60;

  // INVEST — PERSONA label
  ctx.fillStyle = accent;
  ctx.font = "700 11px 'Space Mono', monospace";
  ctx.letterSpacing = '0.2em';
  ctx.fillText('INVEST — PERSONA', rx, ry);
  ry += 52;
  ctx.letterSpacing = '0';

  // Archetype name
  ctx.fillStyle = '#e8e8f0';
  ctx.font = "800 64px 'Syne', sans-serif";
  ctx.fillText(archetypeData.name, rx, ry);
  ry += 20;

  // ── Quote ──────────────────────────────────────────────
  ry += 20;
  const quoteLines = archetypeData.quote.split('\n');
  ctx.fillStyle = `${accent}80`;
  ctx.fillRect(rx, ry, 3, quoteLines.length * 22 + 4);
  ctx.fillStyle = 'rgba(232,232,240,0.45)';
  ctx.font = "400 14px 'Space Mono', monospace";
  for (const line of quoteLines) {
    ctx.fillText(line, rx + 14, ry + 16);
    ry += 22;
  }
  ry += 24;

  // ── Divider ──────────────────────────────────────────────
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.fillRect(rx, ry, rw, 1);
  ry += 20;

  // ── ETF pick ─────────────────────────────────────────────
  ctx.fillStyle = accent;
  ctx.font = "700 28px 'Space Mono', monospace";
  ctx.fillText(archetypeData.etf.ticker, rx, ry + 22);

  ctx.fillStyle = 'rgba(232,232,240,0.5)';
  ctx.font = "400 12px 'Space Mono', monospace";
  ctx.fillText(archetypeData.etf.name, rx, ry + 42);
  ry += 60;

  // ── Axis bars ────────────────────────────────────────────
  const barLabelW = 88;
  const barAreaW  = rw - barLabelW - 36;
  const barH      = 3;
  const barGap    = 18;

  for (let i = 0; i < AXIS_KEYS.length; i++) {
    const key   = AXIS_KEYS[i];
    const score = archetypeData.radarScores[key];
    const label = AXES[i].toUpperCase();
    const y     = ry + i * barGap;

    // label
    ctx.fillStyle = 'rgba(232,232,240,0.4)';
    ctx.font = "400 9px 'Space Mono', monospace";
    ctx.fillText(label, rx, y + 9);

    // track
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(rx + barLabelW, y + 4, barAreaW, barH);

    // fill
    ctx.fillStyle = accent;
    ctx.shadowColor = accent;
    ctx.shadowBlur = 4;
    ctx.fillRect(rx + barLabelW, y + 4, (score / 10) * barAreaW, barH);
    ctx.shadowBlur = 0;

    // score
    ctx.fillStyle = accent;
    ctx.font = "700 10px 'Space Mono', monospace";
    ctx.fillText(String(score), rx + barLabelW + barAreaW + 8, y + 9);
  }
  ry += AXIS_KEYS.length * barGap + 20;

  // ── Divider ──────────────────────────────────────────────
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.fillRect(rx, ry, rw, 1);
  ry += 16;

  // ── First rule ───────────────────────────────────────────
  ctx.fillStyle = accent;
  ctx.font = "700 9px 'Space Mono', monospace";
  ctx.fillText('RULE 1', rx, ry + 11);

  const ruleText = archetypeData.rules[0]?.text ?? '';
  ctx.fillStyle = 'rgba(232,232,240,0.4)';
  ctx.font = "400 11px 'Space Mono', monospace";
  const ruleLines = wrapText(ctx, ruleText, rw - 60);
  for (const line of ruleLines) {
    ctx.fillText(line, rx + 56, ry + 11);
    ry += 16;
  }

  // ── Bottom disclaimer ────────────────────────────────────
  ctx.fillStyle = 'rgba(232,232,240,0.2)';
  ctx.font = "400 9px 'Space Mono', monospace";
  ctx.fillText(
    'Not financial advice. For educational purposes only. All investments carry risk.',
    rx,
    H - 22,
  );

  // ── INVEST — PERSONA watermark bottom-left ────────────────
  ctx.fillStyle = `${accent}40`;
  ctx.font = "700 9px 'Space Mono', monospace";
  ctx.fillText('INVEST — PERSONA', 24, H - 22);

  // ── Trigger download ─────────────────────────────────────
  const dataUrl = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href     = dataUrl;
  a.download = `invest-persona-${archetypeKey}.png`;
  a.click();
}
