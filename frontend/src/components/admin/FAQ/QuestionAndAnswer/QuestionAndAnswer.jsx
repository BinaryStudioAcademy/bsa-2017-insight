import React from 'react';
import propTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import styles from './styles.scss';

const QuestionAndAnswer = ({ faq, action }) => {
  const disabled = !( (action === 'add') || (action === 'modify') );
  return (
    <div>
      <h3>Question</h3>
      <TextField
        disabled={disabled}
        id={'question'}
        required
        className={styles['text-field-disabled-' + `${disabled}`]}
        multiLine
        defaultValue={faq.question}
        name={faq.question}
        key={faq._id}
      />
      <h3>Answer</h3>
      <TextField
        disabled={disabled}
        required
        className={styles['text-field-disabled-' + `${disabled}`]}
        multiLine
        defaultValue={faq.answer}
        id={'answer'}
        name={faq.answer}
        key={`faq._id${faq._id}`}
      />
    </div>
  );
};

QuestionAndAnswer.propTypes = {
  faq: propTypes.shape({
    _id: propTypes.string.isRequired,
    answer: propTypes.string.isRequired,
    question: propTypes.string.isRequired,
    createdAt : propTypes.any.isRequired
  }),
  action: propTypes.string
};

export default QuestionAndAnswer;

