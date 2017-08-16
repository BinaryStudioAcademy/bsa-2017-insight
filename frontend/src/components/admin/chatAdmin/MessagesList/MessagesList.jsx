import React from 'react';
import propTypes from 'prop-types';
import Message from './../Message/Message';
import styles from './styles.scss';

const MessagesList = (props) => {
  return (
    <ul className={styles['messages-list']}>
      {props.messages && props.messages.map((message) => {
        return (
          <Message key={message._id} body={message.body} name={message.author.item.username} />
        );
      })}
    </ul>
  );
};

MessagesList.propTypes = {
  messages: propTypes.arrayOf(propTypes.shape({
    conversationId: propTypes.string.isRequired,
    body: propTypes.string.isRequired,
    author: propTypes.shape({
      item: propTypes.any.isRequired,
      userType: propTypes.string.isRequired,
    }).isRequired,
    createdAt: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    editedAt: propTypes.oneOfType([propTypes.number, propTypes.string]),
  })),
};

export default MessagesList;

