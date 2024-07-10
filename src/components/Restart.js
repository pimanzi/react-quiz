function Restart({ dispatch }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: 'restartQuestion' })}
    >
      Restart Quiz
    </button>
  );
}

export default Restart;
