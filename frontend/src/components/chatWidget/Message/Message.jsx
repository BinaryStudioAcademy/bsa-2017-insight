import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';

const Message = ({ name, body, isReceived, type }) => {
  let status;
  if (type === 'User') {
    status = isReceived ? ' (read)' : ' (unread)';
  } else {
    status = '';
  }
  return (
    <li className={styles['message-item']}>
      {`${name}: ${body}${status}`}
    </li>
  );
};

Message.propTypes = {
  name: propTypes.string,
  body: propTypes.string,
  isReceived: propTypes.bool,
};

export default Message;
