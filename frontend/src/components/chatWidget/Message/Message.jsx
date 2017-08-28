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
  const statusSpan = <span className={styles['message-status']}>{status}</span>;
  const nameSpan = <span className={styles['message-author']}>{`${name}:`}</span>;
  let message;
  let result;
  if (typeof body === 'object') {
    if (body.isImage) {
      message = (
        <a href={body.path} target="_blank">
          <img className={styles['message-body-image']} src={body.path} alt={body.fileName} />
        </a>);
    } else {
      message = <a className={styles['message-body-link']} href={body.path}>{body.fileName}.{body.fileType}</a>;
    }
  } else {
    message = <span className={styles['message-body-text']}><EmojiRender text={body} /></span>;
  }
  if (messageAuthor) {
    result = (<li
      className={`${styles[messageStyle]} ${styles['message-item']}`}
    >
      {nameSpan}
      {message}
      {statusSpan}
    </li>);
  } else {
    result = <li className={`${styles[messageStyle]} ${styles['message-item']}`}><EmojiRender text={message} /></li>;
  }
  return result;
};

Message.propTypes = {
  name: propTypes.string,
  body: propTypes.oneOfType([propTypes.string, propTypes.shape({
    finalName: propTypes.string,
    fileName: propTypes.string,
    fileType: propTypes.string,
    isImage: propTypes.bool,
  })]),
  messageStyle: propTypes.string,
  isReceived: propTypes.bool,
  type: propTypes.string,
};

export default Message;
