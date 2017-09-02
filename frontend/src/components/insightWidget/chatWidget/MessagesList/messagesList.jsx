import React from 'react';
import propTypes from 'prop-types';
import Message from './../Message/Message';
import styles from './styles.scss';

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToLastMessage = this.scrollToLastMessage.bind(this);
  }
  componentDidMount() {
    this.scrollToLastMessage();
  }
  componentDidUpdate() {
    this.scrollToLastMessage();
  }
  scrollToLastMessage() {
    if (this.list) this.list.scrollTop = this.list.scrollHeight - this.list.clientHeight;
  }
  render() {
    const listStyles = { backgroundImage: `url(${this.props.widgetStyles.backgroundImage}.png)` };
    const userMessageColor = { backgroundColor: this.props.widgetStyles.primaryColor };

    return (
      <ul
        className={styles['messages-list']}
        style={listStyles}
        ref={(node) => {
          this.list = node;
        }}
      >
        {this.props.messages && this.props.messages.map((message) => {
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
              userMessageColor={userMessageColor}
              messageStyle={style}
              avatar={message.author ? message.author.item.avatar : ''}
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
  }
}

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
  widgetStyles: propTypes.shape({
    backgroundImage: propTypes.string,
    primaryColor: propTypes.string,
    widgetPosition: propTypes.string,
  }),
};

export default MessagesList;
