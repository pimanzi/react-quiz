function StartScreen({ numQuestions, dispatch, hasAttempted }) {
  if (!hasAttempted)
    return (
      <div className="start">
        <h2>Welcome to the React Quiz!</h2>
        <h3>{numQuestions} questions to test your React mastery</h3>
        <button
          onClick={() => dispatch({ type: 'start' })}
          className="btn btn-ui"
        >
          Let's start
        </button>
      </div>
    );

  if (hasAttempted)
    return (
      <div className="start">
        <h2>Welcome again to the React Quiz!</h2>
        <h3>{numQuestions} questions to test your React mastery</h3>
        <button
          onClick={() => dispatch({ type: 'start' })}
          className="btn btn-ui"
        >
          Let's start
        </button>
      </div>
    );
}

export default StartScreen;
