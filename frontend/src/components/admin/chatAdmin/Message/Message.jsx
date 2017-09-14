import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';
import EmojiRender from '../../../emojiRender';

const Message = ({ name, body, type, createdAt }) => {
  const messageAlign = type === 'Admin' ? 'message-item-left' : 'message-item-right';
  const bodyIsLink = typeof body === 'object';
  let message;
  if (bodyIsLink) {
    if (body.isImage) {
      message = (
        <a href={body.path} target="_blank">
          <img className={styles['message-body-image']} src={body.path} alt={body.fileName} />
        </a>);
    } else {
      message = <a href={body.path}>{body.fileName}.{body.fileType}</a>;
    }
  } else {
    message = <EmojiRender text={body} />;
  }
  return (
    <li className={`${styles[messageAlign]} ${styles['message-item']}`}>
      <span className={styles['message-body']}>{message}</span>
      <span className={styles['user-name']}>{name}, {createdAt.toLocaleTimeString()}</span>
    </li>
  );
};

Message.propTypes = {
  name: propTypes.string,
  body: propTypes.oneOfType([propTypes.string, propTypes.shape({
    finalName: propTypes.string,
    fileName: propTypes.string,
    fileType: propTypes.string,
    isImage: propTypes.bool,
  })]),
  type: propTypes.string,
  createdAt: propTypes.instanceOf(Date),
};

export default Message;

