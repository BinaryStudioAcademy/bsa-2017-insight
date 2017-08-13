import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';

const Message = (props) => {
  return (
    <li className={styles['message-item']}>
      {props.body}
    </li>
  );
};

Message.propTypes = {
  body: propTypes.string,
};

export default Message;
