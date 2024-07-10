import { useEffect, useReducer } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Loader from './Loader.js';
import Error from './Error.js';
import StartScreen from './StartScreen.js';
import Question from './Question.js';
import NextButton from './NextButton.js';
import Progress from './Progress.js';
import FinishScreen from './FinishScreen.js';
import Restart from './Restart.js';
import Footer from './Footer.js';
import Timer from './Timer.js';
const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  points: 0,
  answer: null,
  highscore: 0,
  hasAttempted: false,
  secondsRemaining: null,
};
const SECS_PER_QUESTION = 30;
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };

    case 'dataFailed':
      return { ...state, status: 'error' };

    case 'start':
      return {
        ...state,
        status: 'active',
        hasAttempted: true,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case 'hasAnswered':
      const currQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currQuestion.correctOption
            ? state.points + currQuestion.points
            : state.points,
      };

    case 'nextQuestion':
      return {
        ...state,
        answer: null,
        index: state.index !== 15 ? state.index + 1 : state.index,
      };

    case 'finishQuestion':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case 'restartQuestion':
      return {
        ...state,
        secondsRemaining: null,
        status: 'ready',
        points: 0,
        index: 0,
        answer: null,
      };

    case 'Tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : 'active',
      };
    default:
      throw new Error('Action not Found');
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      hasAttempted,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const pointsSum = questions.reduce((prev, curr) => prev + curr.points, 0);
  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);
  return (
    <div className="app">
      <Header></Header>
      <Main>
        {status === 'loading' && <Loader></Loader>}
        {status === 'error' && <Error></Error>}
        {status === 'ready' && (
          <StartScreen
            dispatch={dispatch}
            numQuestions={numQuestions}
            hasAttempted={hasAttempted}
          ></StartScreen>
        )}
        {status === 'active' && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              pointsSum={pointsSum}
              points={points}
              answer={answer}
            ></Progress>
            <Footer>
              <Question
                dispatch={dispatch}
                answer={answer}
                question={questions[index]}
              ></Question>
              <NextButton
                dispatch={dispatch}
                index={index}
                answer={answer}
                numQuestions={numQuestions}
              ></NextButton>
              <Timer
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              ></Timer>
            </Footer>
          </>
        )}

        {status === 'finished' && (
          <>
            {' '}
            <FinishScreen
              points={points}
              pointsSum={pointsSum}
              highScore={highscore}
            ></FinishScreen>
            <Restart dispatch={dispatch}></Restart>
          </>
        )}
      </Main>
    </div>
  );
}
