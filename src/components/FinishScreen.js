function FinishScreen({ points, pointsSum, highScore }) {
  const percentage = (points / pointsSum) * 100;
  let emoji;
  if (percentage === 100) emoji = '🥇';

  if (percentage >= 80 && percentage < 100) emoji = '🎉';

  if (percentage >= 50 && percentage < 80) emoji = '🙃';

  if (percentage < 50) emoji = '🙁';

  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of {pointsSum} points (
        {Math.ceil(percentage)})
      </p>
      <p className="highscore">HighScore {highScore} points</p>
    </>
  );
}

export default FinishScreen;
