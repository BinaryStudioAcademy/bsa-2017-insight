import React from 'react';
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
  faq: React.PropTypes.objectOf(),
  action: React.PropTypes.string
};

export default QuestionAndAnswer;

