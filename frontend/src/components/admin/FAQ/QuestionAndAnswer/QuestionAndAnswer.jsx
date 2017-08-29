import React from 'react';
import TextField from 'material-ui/TextField';
import styles from './styles.scss';  

const QuestionAndAnswer = ({ faq, action, handleQuestionChange, handleAnswerChange }) => {
  let disabled;
  ((action == "add") || (action == "modify")) ? disabled = false : disabled = true;
  return (
    <div>
      <h3>Question</h3>
      <TextField
          disabled={disabled}
          required
          className={styles['text-field-disabled-' + `${disabled}`]}
          multiLine={true}
          defaultValue={faq.question}
          name={faq.question}
          key={faq._id}
          onChange={handleQuestionChange}
      />
      <h3>Answer</h3>
      <TextField
          disabled={disabled}
          required
          className={styles['text-field-disabled-' + `${disabled}`]}
          multiLine={true}
          defaultValue={faq.answer}
          id={"answer"}
          name={faq.answer}
          key={"faq._id" + faq._id}
          onChange={handleAnswerChange}
      />
    </div>
  );
};

export default QuestionAndAnswer;

