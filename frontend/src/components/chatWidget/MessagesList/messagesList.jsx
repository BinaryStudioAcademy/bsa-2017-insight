import React from 'react';
import propTypes from 'prop-types';
import Message from './../Message/Message';
import styles from './styles.scss';

const MessagesList = (props) => {
  return (
    <ul className={styles['messages-list']}>
      {props.messages && props.messages.map((message) => {
        let style;
        if (message.forceMessage) {
          style = 'force-message';
        } else if (message.author.userType === 'Admin') {
          style = 'admin-message';
        } else {
          style = 'user-message';
        }
        return (
          <Message
            messageStyle={style}
            key={message._id}
            body={message.body}
            name={message.author ? message.author.item.username : ''}
            isReceived={message.isReceived}
            type={message.author ? message.author.userType : ''}
          />
        );
      })}
    </ul>
  );
};

MessagesList.propTypes = {
  messages: propTypes.arrayOf(propTypes.shape({
    conversationId: propTypes.string,
    body: propTypes.oneOfType([propTypes.string, propTypes.shape({
      finalName: propTypes.string,
      fileName: propTypes.string,
      fileType: propTypes.string,
      isImage: propTypes.bool,
    })]).isRequired,
    author: propTypes.shape({
      item: propTypes.any.isRequired,
      userType: propTypes.string.isRequired,
    }),
    createdAt: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    editedAt: propTypes.number,
  })),
};

export default MessagesList;
