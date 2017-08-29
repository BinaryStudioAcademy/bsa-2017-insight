import React from 'react';
import styles from './styles.scss';

const Question = ({ question, setSelectedId}) => {
  return (
    <li onClick={setSelectedId}>
      <p>{`${question}`}</p>
    </li>
  );
};

export default Question;

