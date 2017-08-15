import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';

function createConversationName(participants) {
  const nonUserParticipantsString = participants.filter(participant => participant.userType !== 'User')
    .map((participant) => {
      return participant.user.username;
    })
    .join(',');
  if (nonUserParticipantsString === '') return 'Conversation hasn\'t been picked up yet';
  return `Conversation with ${nonUserParticipantsString}`;
}

class ConversationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const conversations = this.props.conversations;
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Your conversations</h3>
        <ul className={styles['conversations-list']}>
          {conversations && conversations.map((conversation) => {
            return (
              <li
                className={styles['conversation-item']}
                key={conversation._id}
                onClick={() => this.props.onConversationClick(conversation._id)}
              >
                {createConversationName(conversation.participants)}
              </li>
            );
          })}
        </ul>
        <button
          className={styles['create-conversation-button']}
          onClick={this.props.onCreateConversationButtonClick}
        >
          Create new conversation
        </button>
      </div>
    );
  }
}

ConversationsList.propTypes = {
  conversations: propTypes.arrayOf(propTypes.shape({
    _id: propTypes.string.isRequired,
    participants: propTypes.arrayOf(propTypes.shape({
      userType: propTypes.string,
      user: propTypes.any,
    })).isRequired,
    messages: propTypes.arrayOf(propTypes.any).isRequired,
    open: propTypes.bool,
    createdAt: propTypes.oneOfType([propTypes.number, propTypes.string]),
  })),
  onConversationClick: propTypes.func.isRequired,
  onCreateConversationButtonClick: propTypes.func.isRequired,
};

export default ConversationsList;
