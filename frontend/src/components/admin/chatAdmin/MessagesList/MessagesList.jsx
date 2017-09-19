import React from 'react';
import propTypes from 'prop-types';
import Message from './../Message/Message';
import styles from './styles.scss';

let uniqueId = 0;

class MessagesList extends React.Component {

  componentDidMount() {
    if (this.list) this.list.scrollTop = this.list.scrollHeight - this.list.clientHeight;
  }

  componentDidUpdate() {
    if (this.list) this.list.scrollTop = this.list.scrollHeight - this.list.clientHeight;
  }

  getChatElements() {
    let previousDate = null;
    const chatElements = [];
    if (this.props.messages) {
      this.props.messages.map((message) => {
        const thisDate = new Date(message.createdAt).getDay();
        if (thisDate !== previousDate) {
          chatElements.push(
            <p
              className={styles['date-time'] + ' ' + 'dateTime'}
              key={uniqueId++}
            >
              {this.props.convertDate(message.createdAt)}
            </p>);
        }
        chatElements.push(
          <Message
            key={message._id}
            body={message.body}
            name={message.author.item.firstName || message.author.item.username}
            createdAt={new Date(message.createdAt)}
            type={message.author.userType}
            isReceived={message.isReceived}
            className="message"
            conversation={message.conversationId}
          />);
        previousDate = new Date(message.createdAt).getDay();
        return null;
      });
    }
    return chatElements;
  }

  render() {
    const chatElements = this.getChatElements();
    return (
      <ul
        ref={(node) => {
          this.list = node;
        }}
        id="messageList"
        className={styles['messages-list']}
        style={{ backgroundColor: this.props.chosenTheme.palette.canvasColor }}
        onScroll={() => this.props.getMessageDate()}
      >
        {chatElements}
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
      userType: propTypes.string.isRequired,
    }).isRequired,
    createdAt: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    editedAt: propTypes.oneOfType([propTypes.number, propTypes.string]),
  })),
  chosenTheme: propTypes.shape({
    borderRadius: propTypes.number,
    fontFamily: propTypes.string,
    palette: propTypes.object,
    spacing: propTypes.object,
  }),
  convertDate: propTypes.func,
  getMessageDate: propTypes.func,
};

export default MessagesList;

