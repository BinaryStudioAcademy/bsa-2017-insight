import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';

const Message = ({ name, body, type, isReceived }) => {
  const messageAlign = type === 'Admin' ? 'message-item-left' : 'message-item-right';
  let status;
  if (type === 'Admin') {
    status = isReceived ? ' (read)' : ' (unread)';
  } else {
    status = '';
  }
  return (
    <li className={styles[messageAlign]}>
      <span className={styles['message-body']}>{`${body}`}</span>
      <span className={styles['user-name']}>{`${name}${status}`}</span>
    </li>
  );
};

Message.propTypes = {
  name: propTypes.string,
  body: propTypes.string,
  type: propTypes.string,
  isReceived: propTypes.bool,
};

export default Message;

