import { useEffect } from 'react';
function Timer({ dispatch, secondsRemaining }) {
  const min = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  useEffect(
    function () {
      const Id = setInterval(() => dispatch({ type: 'Tick' }), 1000);
      return () => clearInterval(Id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min < 10 ? '0' : ''}
      {min}: {secs < 10 ? '0' : ''}
      {secs}
    </div>
  );
}

export default Timer;
