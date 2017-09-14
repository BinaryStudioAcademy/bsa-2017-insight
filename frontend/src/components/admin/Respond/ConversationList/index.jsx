import React from 'react';
import propTypes from 'prop-types';
import { List } from 'material-ui/List';
import SingleConversation from '../SingleConversation';

class ConversationList extends React.Component {
  componentDidMount() {
    if (this.anchor) this.anchor.scrollIntoView();
  }
  render() {
    return (
      <List style={{ padding: '0px' }}>
        {this.props.conversations.map((e) => {
          const activeConv = this.props.nowActive ? this.props.nowActive : null;
          const handler = activeConv === e._id ?
            () => this.props.removeConversations() :
            () => this.props.setConversation(e._id);
          if (activeConv && activeConv === e._id) {
            return (
              <div key={e._id}>
                <div
                  ref={(node) => {
                    this.anchor = node;
                  }}
                />
                <SingleConversation
                  active
                  handler={handler}
                  setStatistic={this.props.setStatistic}
                  conversation={e}
                  chosenTheme={this.props.chosenTheme}
                />
              </div>
            );
          }
          return (
            <SingleConversation
              key={e._id}
              handler={handler}
              setStatistic={this.props.setStatistic}
              conversation={e}
              chosenTheme={this.props.chosenTheme}
            />
          );
        })}
      </List>
    );
  }
}


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
  removeConversations: propTypes.func,
  setConversation: propTypes.func,
  chosenTheme: propTypes.shape({
    borderRadius: propTypes.number,
    fontFamily: propTypes.string,
    palette: propTypes.object,
    spacing: propTypes.object,
  }),
};

export default ConversationList;
