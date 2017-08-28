import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';

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
    message = body.map((file) => {
      if (file.isImage) {
        return (<a href={file.path} target="_blank">
          <img className={styles['message-body-image']} src={file.path} alt={file.originalName} />
        </a>);
      }
      return <a className={styles['message-body-link']} href={file.path}>{file.originalName}</a>;
    });
  } else {
    message = <span className={styles['message-body-text']}>{body}</span>;
  }
  if (messageAuthor) {
    result = <li className={`${styles[messageStyle]} ${styles['message-item']}`}>{nameSpan}{message}{statusSpan}</li>;
  } else {
    result = <li className={`${styles[messageStyle]} ${styles['message-item']}`}>{message}</li>;
  }
  return result;
};

Message.propTypes = {
  name: propTypes.string,
  body: propTypes.oneOfType([propTypes.string, propTypes.arrayOf(propTypes.shape({
    finalName: propTypes.string,
    fileName: propTypes.string,
    fileType: propTypes.string,
    isImage: propTypes.bool,
  }))]),
  messageStyle: propTypes.string,
  isReceived: propTypes.bool,
  type: propTypes.string,
};

export default Message;
