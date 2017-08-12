import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';

class ConversationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const conversations = this.props.conversations;
    return (
      <ul className={styles['conversations-list']}>
        {conversations && conversations.map((conversation) => {
          return (
            <li
              className={styles['conversation-item']}
              key={conversation._id}
              onClick={() => this.props.onConversationClick(conversation._id)}
            >
              Conversation {conversation._id}
            </li>
          );
        })}
      </ul>
    );
  }
}

ConversationsList.propTypes = {
  conversations: propTypes.array,
  onConversationClick: propTypes.func.isRequired,
};

export default ConversationsList;
