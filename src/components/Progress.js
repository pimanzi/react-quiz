function Progress({ index, numQuestions, pointsSum, points, answer }) {
  return (
    <div className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        <strong>{index + 1}</strong>/ {numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/ {pointsSum}
      </p>
    </div>
  );
}

export default Progress;
