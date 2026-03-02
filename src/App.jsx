import { useState, useCallback } from 'react';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import Processing from './components/Processing';
import Result from './components/Result';
import ProgressBar from './components/ProgressBar';
import Watermark from './components/Watermark';
import GlobalDisclaimer from './components/GlobalDisclaimer';
import { calculateArchetype } from './utils/scoring';

const SCREENS = { landing: 'landing', quiz: 'quiz', processing: 'processing', result: 'result' };
const TOTAL_QUESTIONS = 10;

export default function App() {
  const [screen, setScreen] = useState(SCREENS.landing);
  const [answers, setAnswers] = useState(new Array(TOTAL_QUESTIONS).fill(undefined));
  const [archetype, setArchetype] = useState(null);
  const [suitability, setSuitability] = useState(null);

  const handleBegin = () => setScreen(SCREENS.quiz);

  const handleAnswer = useCallback((newAnswers) => {
    setAnswers(newAnswers);
  }, []);

  const handleComplete = useCallback(() => {
    setScreen(SCREENS.processing);
  }, []);

  const handleProcessingDone = useCallback(() => {
    const { archetype: a, suitability: s } = calculateArchetype(answers);
    setArchetype(a);
    setSuitability(s);
    setScreen(SCREENS.result);
  }, [answers]);

  const handleRetake = useCallback(() => {
    setAnswers(new Array(TOTAL_QUESTIONS).fill(undefined));
    setArchetype(null);
    setSuitability(null);
    setScreen(SCREENS.landing);
  }, []);

  // Progress: count answered questions (Q2 is an array)
  const answeredCount = answers.filter(
    (a) => a !== undefined && !(Array.isArray(a) && a.length === 0)
  ).length;
  const showProgress = screen === SCREENS.quiz;

  return (
    <>
      {showProgress && (
        <ProgressBar current={answeredCount} total={TOTAL_QUESTIONS} />
      )}
      <Watermark />

      {screen === SCREENS.landing && <Landing onBegin={handleBegin} />}
      {screen === SCREENS.quiz && (
        <Quiz
          answers={answers}
          onAnswer={handleAnswer}
          onComplete={handleComplete}
        />
      )}
      {screen === SCREENS.processing && <Processing onDone={handleProcessingDone} />}
      {screen === SCREENS.result && archetype && (
        <Result archetype={archetype} suitability={suitability} answers={answers} onRetake={handleRetake} />
      )}

      <GlobalDisclaimer />
    </>
  );
}
