import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';
import EmojiRender from '../../emojiRender';

const Message = ({ name, body, messageStyle, isReceived, type }) => {
  const messageAuthor = messageStyle === 'force-message' ? null : name;
  let status;
  if (type === 'User') {
    status = isReceived ? ' (read)' : ' (unread)';
  } else {
    status = '';
  }
  const message = messageAuthor ? `${name}: ${body}${status}` : `${body}`
  return (
    <li className={styles[messageStyle]}>
      <EmojiRender text={message} />
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
