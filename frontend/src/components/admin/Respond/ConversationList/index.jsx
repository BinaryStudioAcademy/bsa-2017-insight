import React from 'react';
import propTypes from 'prop-types';
import SingleConversation from '../SingleConversation';

const ConversationList = (props) => {
  if (props.conversations === null) {
    return <h3 style={{ margin: '10px' }}>Loading...</h3>;
  } else if (!props.conversations.length) {
    return <h3 style={{ margin: '10px' }}>Conversations list is empty now</h3>;
  }

  return (
    <div>
      {props.conversations.map((e) => {
        const activeConv = props.nowActive ? props.nowActive : null;
        const handler = activeConv === e._id ? () => props.removeConversations() : () => props.setConversation(e._id);
        return (
          <SingleConversation
            key={e._id}
            handler={handler}
            setStatistic={props.setStatistic}
            conversation={e}
            chosenTheme={props.chosenTheme}
          />
        );
      })}
    </div>
  );
};


ConversationList.propTypes = {
  setStatistic: propTypes.func,
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
  nowActive: propTypes.string,
};

export default ConversationList;
