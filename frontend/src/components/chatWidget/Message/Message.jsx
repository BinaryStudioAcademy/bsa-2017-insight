import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';

const Message = ({ name, body, messageStyle}) => {
  const messageAuthor = messageStyle === 'force-message' ? null : name;
  return (
    <li className={styles[messageStyle]}>
      { messageAuthor ? `${name}: ${body}` : `${body}`}
    </li>
  );
};

Message.propTypes = {
  name: propTypes.string,
  body: propTypes.string,
  messageStyle: propTypes.string,
};

export default Message;
