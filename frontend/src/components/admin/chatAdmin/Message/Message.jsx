import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';

const Message = ({ name, body }) => {
  return (
    <li className={styles['message-item']}>
      {`${name}: ${body}`}
    </li>
  );
};

Message.propTypes = {
  name: propTypes.string,
  body: propTypes.string,
};

export default Message;

