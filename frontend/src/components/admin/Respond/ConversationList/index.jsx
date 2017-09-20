import React from 'react';
import propTypes from 'prop-types';
import { List } from 'material-ui/List';
import SingleConversation from '../SingleConversation';
import styles from './styles.scss';

let uniqueId = 0;

class ConversationList extends React.Component {
  componentDidMount() {
    if (this.anchor) this.anchor.scrollIntoView();
  }

  convertDate(date) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = new Date(date).getMonth();
    const text = months[month] + ' ' + new Date(date).getDate();
    return text;
  }

  render() {
    if (this.props.conversations === null) {
      return <h3 style={{ margin: '10px' }}>Loading...</h3>;
    } else if (!this.props.conversations.length) {
      return <h3 style={{ margin: '10px' }}>Conversations list is empty now</h3>;
    }
    let previousChatDate;
    let nextPreviousChatDate = null;
    return (
      <List style={{ padding: '0px' }}>
        {this.props.conversations.map((e) => {
          const activeConv = this.props.nowActive ? this.props.nowActive : null;
          const handler = activeConv === e._id ?
            () => this.props.removeConversations() :
            () => this.props.setConversation(e._id);
          const thisChatDate = new Date(e.messages[e.messages.length - 1].createdAt).getDay();
          previousChatDate = nextPreviousChatDate;
          nextPreviousChatDate = thisChatDate;
          if (activeConv && activeConv === e._id) {
            return (
              <div key={e._id}>
                <div
                  ref={(node) => {
                    this.anchor = node;
                  }}
                />
                {(thisChatDate === previousChatDate) ?
                  null :
                  <p
                    className={styles['date-time']}
                    key={uniqueId++}
                  >
                    {this.convertDate(e.messages[e.messages.length - 1].createdAt)}
                  </p>}
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
            <div key={uniqueId++}>
              {(thisChatDate === previousChatDate) ?
                null :
                <p
                  className={styles['date-time']}
                  key={uniqueId++}
                >
                  {this.convertDate(e.messages[e.messages.length - 1].createdAt)}
                </p>}
              <SingleConversation
                key={e._id}
                handler={handler}
                setStatistic={this.props.setStatistic}
                conversation={e}
                chosenTheme={this.props.chosenTheme}
              />
            </div>
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
