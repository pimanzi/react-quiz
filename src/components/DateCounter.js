import { useReducer } from 'react';
function reducer(state, action) {
  switch (action.type) {
    case 'dec':
      return { ...state, count: state.count - state.step };

    case 'inc':
      return { ...state, count: state.count + state.step };

    case 'setCount':
      return { ...state, count: action.payload };

    case 'setNaN':
      return { ...state, count: 0 };

    case 'setStep':
      return { ...state, step: action.payload };

    case 'reset':
      return { count: 0, step: 1 };

    default:
      throw new Error('action not recognised');
  }
  //   if (action.type === 'dec') return state - 1;
  //   if (action.type === 'inc') return state + 1;
  //   if (action.type === 'setCount') return action.payload;
}

function DateCounter() {
  //   const [count, setCount] = useState(0);
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;
  //   const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    dispatch({ type: 'dec' });
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: 'inc' });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    if (isNaN(e.target.value)) {
      dispatch({ type: 'setNaN' });
      return;
    }
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: 'reset' });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
