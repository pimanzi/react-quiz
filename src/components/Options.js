function Options({ question, answer, dispatch }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'hasAnswered', payload: index })}
          key={option}
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
