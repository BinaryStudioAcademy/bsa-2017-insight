import React from 'react';
import propTypes from 'prop-types';
import { List } from 'material-ui/List';
import SingleConversation from '../SingleConversation';

const ConversationList = (props) => {
  return (
    <List style={{ padding: '0px' }}>
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
    </List>
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
