import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';
import EmojiRender from '../../emojiRender';

const Message = ({ name, body, messageStyle, isReceived, type, avatar, userMessageColor }) => {
  const messageAuthor = messageStyle === 'force-message' ? null : name;
  let status;
  if (type === 'User') {
    status = isReceived ? 'Seen' : 'Message is not seen yet';
  } else {
    status = '';
  }
  const avatarSrc = avatar === 'avatar.png' ?
    'https://www.materialist.com/static/new_store/images/avatar_placeholder.svg' :
    avatar;
  const statusSpan = <span className={styles['message-status']}>{status}</span>;
  const senderAvatar = <img className={styles['sender-avatar']} src={avatarSrc} alt="sender-avatar" />;
  let message;
  let result;
  if (typeof body === 'object') {
    if (body.isImage) {
      message = (
        <a href={body.path} className={styles['message-body-image']} target="_blank">
          <img src={body.path} alt={body.fileName} />
        </a>);
    } else {
      message = (<a
        className={styles['message-body-link']}
        href={body.path}
        style={userMessageColor}>
        {body.fileName}.{body.fileType}
      </a>);
    }
  } else {
    message = <span className={styles['message-body-text']} style={userMessageColor}><EmojiRender text={body} /></span>;
  }
  if (messageAuthor) {
    result = (<li
      className={`${styles[messageStyle]} ${styles['message-item']}`}
    >
      {senderAvatar}
      {message}
      {statusSpan}
    </li>);
  } else {
    result = <li className={`${styles[messageStyle]} ${styles['message-item']}`}>{message} </li>;
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
  avatar: propTypes.string,
  userMessageColor: propTypes.shape({
    backgroundColor: propTypes.string,
  }),
};

export default Message;
