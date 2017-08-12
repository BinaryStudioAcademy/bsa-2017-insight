import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';

const ChatWidget = (props) => {
  return (
    <div
      role="button"
      tabIndex="0"
      className={styles['chat-icon']}
      onClick={props.onChatIconClick}
    />
  );
};

ChatWidget.propTypes = {
  onChatIconClick: propTypes.func.isRequired,
};

export default ChatWidget;
