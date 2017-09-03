import React from 'react';
import propTypes from 'prop-types';
import Message from './../Message/Message';
import styles from './styles.scss';

class MessagesList extends React.Component {
  componentDidMount() {
    if (this.list) this.list.scrollTop = this.list.scrollHeight - this.list.clientHeight;
  }
  componentDidUpdate() {
    if (this.list) this.list.scrollTop = this.list.scrollHeight - this.list.clientHeight;
  }
  render() {
    return (
      <ul
        ref={(node) => {
          this.list = node;
        }}
        className={styles['messages-list']}
        style={{ backgroundColor: this.props.chosenTheme.palette.canvasColor }}
      >
        {this.props.messages && this.props.messages.map((message) => {
          return (
            <Message
              key={message._id}
              body={message.body}
              name={message.author.item.username}
              type={message.author.userType}
              isReceived={message.isReceived}
            />
          );
        })}
      </ul>
    );
  }
}

MessagesList.propTypes = {
  messages: propTypes.arrayOf(propTypes.shape({
    conversationId: propTypes.string.isRequired,
    body: propTypes.oneOfType([propTypes.string, propTypes.shape({
      finalName: propTypes.string,
      fileName: propTypes.string,
      fileType: propTypes.string,
      isImage: propTypes.bool,
    })]).isRequired,
    author: propTypes.shape({
      item: propTypes.any.isRequired,
      userType: propTypes.string.isRequired
    }).isRequired,
    createdAt: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    editedAt: propTypes.oneOfType([propTypes.number, propTypes.string]),
  })),
};

export default MessagesList;

