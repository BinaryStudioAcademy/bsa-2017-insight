import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';

const ChatWidget = (props) => {
  return (
    <img 
      src="http://www.iconsfind.com/wp-content/uploads/2015/12/20151229_5682318d75553.png"
      alt="" 
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
