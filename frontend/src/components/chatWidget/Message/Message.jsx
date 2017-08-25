import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';

const Message = ({ name, body, messageStyle, isReceived, type }) => {
  const messageAuthor = messageStyle === 'force-message' ? null : name;
  let status;
  if (type === 'User') {
    status = isReceived ? ' (read)' : ' (unread)';
  } else {
    status = '';
  }
  return (
    <li className={styles[messageStyle]}>
      {messageAuthor ? `${name}: ${body}${status}` : `${body}`}
    </li>
  );
};

Message.propTypes = {
  name: propTypes.string,
  body: propTypes.string,
  messageStyle: propTypes.string,
  isReceived: propTypes.bool,
  type: propTypes.string,
};

export default Message;
