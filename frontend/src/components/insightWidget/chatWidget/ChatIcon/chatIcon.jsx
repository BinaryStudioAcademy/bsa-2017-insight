import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';

const ChatWidget = (props) => {
  const iconStyles = props.widgetStyles.widgetPosition === 'right' ?
    {
      right: '25px',
      bottom: '25px',
    } :
    {
      left: '25px',
      bottom: '25px',
    };
  return (
    <img
      src="http://www.iconsfind.com/wp-content/uploads/2015/12/20151229_5682318d75553.png"
      style={iconStyles}
      alt=""
      role="button"
      tabIndex="0"
      onClick={props.onChatIconClick}
      className={styles['chat-icon']}
    />
  );
};

ChatWidget.propTypes = {
  widgetStyles: propTypes.shape({
    backgroundImage: propTypes.string,
    primaryColor: propTypes.string,
    widgetPosition: propTypes.string,
  }),
  onChatIconClick: propTypes.func.isRequired,
};

export default ChatWidget;
// {/* className={styles['chat-icon']} */}
