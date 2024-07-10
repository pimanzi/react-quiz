import Options from './Options';
function Question({ question, answer, dispatch }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        answer={answer}
        question={question}
        dispatch={dispatch}
      ></Options>
    </div>
  );
}

export default Question;
