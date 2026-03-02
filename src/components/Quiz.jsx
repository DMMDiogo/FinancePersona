import { useState } from 'react';
import Q1 from './questions/Q1';
import Q2 from './questions/Q2';
import Q3 from './questions/Q3';
import Q4 from './questions/Q4';
import Q5 from './questions/Q5';
import Q6 from './questions/Q6';
import Q7 from './questions/Q7';
import Q8 from './questions/Q8';
import QHoldings from './questions/QHoldings';
import QTimeHorizon from './questions/QTimeHorizon';
import styles from './Quiz.module.css';

const QUESTIONS = [Q1, Q4, Q3, QHoldings, Q2, Q6, Q5, Q7, Q8, QTimeHorizon];

export default function Quiz({ answers, onAnswer, onComplete }) {
  const [step, setStep] = useState(0);

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    onAnswer(newAnswers);
  };

  const handleContinue = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleAutoAdvance = (value) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    onAnswer(newAnswers);
    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1);
      } else {
        onComplete();
      }
    }, 50);
  };

  const CurrentQ = QUESTIONS[step];
  const isLastQ = step === QUESTIONS.length - 1;
  const hasAnswer = Array.isArray(answers[step])
    ? answers[step].length > 0
    : answers[step] !== undefined && answers[step] !== null;

  return (
    <main className={styles.quiz} key={step}>
      <CurrentQ
        answer={answers[step]}
        onAnswer={handleAnswer}
        onAutoAdvance={handleAutoAdvance}
        onContinue={handleContinue}
        step={step}
        total={QUESTIONS.length}
        isLast={isLastQ}
        hasAnswer={hasAnswer}
      />
    </main>
  );
}
