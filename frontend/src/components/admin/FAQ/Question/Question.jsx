import React from 'react';

const Question = ({ question, setSelectedId }) => {
  return (
    <li onClick={setSelectedId}>
      <p>{`${question}`}</p>
    </li>
  );
};

Question.propTypes = {
  setSelectedId: React.PropTypes.func,
  question: React.PropTypes.string,
};

export default Question;

