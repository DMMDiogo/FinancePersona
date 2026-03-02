import { useEffect, useRef, forwardRef } from 'react';
import { SPRITES, drawSprite } from '../data/pixelSprites';
import styles from './PixelArt.module.css';

const GRID_W = 20;
const GRID_H = 28;

const PixelArt = forwardRef(function PixelArt(
  { archetype, size = 160, className = '' },
  ref,
) {
  const canvasRef = useRef(null);
  const cellSize = size / GRID_W;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const { grid, palette } = SPRITES[archetype] ?? SPRITES.builder;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSprite(ctx, grid, palette, cellSize, 0, 0);
  }, [archetype, cellSize]);

  // expose canvas to parent via ref
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') ref(canvasRef.current);
      else ref.current = canvasRef.current;
    }
  }, [ref]);

  const canvasW = GRID_W * cellSize;
  const canvasH = GRID_H * cellSize;

  return (
    <div
      className={`${styles.frame} ${styles[archetype] ?? ''} ${className}`}
      data-archetype={archetype}
    >
      <canvas
        ref={canvasRef}
        width={canvasW}
        height={canvasH}
        className={styles.canvas}
        style={{ width: canvasW, height: canvasH, imageRendering: 'pixelated' }}
        aria-label={`Pixel art illustration for ${archetype} archetype`}
      />
      <span className={styles.tag}>◈ {archetype.toUpperCase()}</span>
    </div>
  );
});

export default PixelArt;
