import { useState } from 'react';
import QuestionShell from './QuestionShell';
import styles from './Q2.module.css';

const WORDS = ['Anxious', 'In Control', 'Confused', 'Ashamed', 'Excited', 'Numb'];

export default function Q2({ answer, onAnswer, onContinue, step, total, isLast, hasAnswer }) {
  const selected = Array.isArray(answer) ? answer : [];

  const handleClick = (word) => {
    const isSelected = selected.includes(word);
    let next;
    if (isSelected) {
      if (selected.length <= 1) return; // keep min 1
      next = selected.filter((w) => w !== word);
    } else {
      if (selected.length >= 2) return; // max 2
      next = [...selected, word];
    }
    onAnswer(next);
  };

  return (
    <QuestionShell
      step={step}
      total={total}
      label="YOUR EMOTIONAL BASELINE"
      question="Pick up to two. Money makes me feel..."
      onContinue={onContinue}
      hasAnswer={hasAnswer}
      isLast={isLast}
    >
      <div className={styles.cloud}>
        {WORDS.map((word) => {
          const isSelected = selected.includes(word);
          const isFaded = selected.length === 2 && !isSelected;
          const isSoft = selected.length === 1 && !isSelected;
          return (
            <button
              key={word}
              className={`${styles.word} ${isSelected ? styles.selected : ''} ${isFaded ? styles.faded : ''} ${isSoft ? styles.soft : ''}`}
              onClick={() => handleClick(word)}
              type="button"
              disabled={isFaded}
            >
              {word}
            </button>
          );
        })}
      </div>
    </QuestionShell>
  );
}
