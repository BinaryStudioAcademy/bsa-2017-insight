import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import ConversationList from './ConversationList';
import { getAllConversations, setConversation, removeConversations } from '../../../actions/conversationsActions';
import * as StatisticActions from '../../../actions/statisticActions';
import Chat from './../chatAdmin/ChatAdmin';
import UserInfo from './../UserInfo/UserInfo';
import styles from './styles.scss';

class Respond extends React.Component {
  constructor() {
    super();
    this.conversationToChat = this.conversationToChat.bind(this);
    this.getIdForStatistic = this.getIdForStatistic.bind(this);
  }

  componentWillMount() {
    this.props.getAllConversations();
  }
  getIdForStatistic(conversation) {
    const userObj = conversation.participants.find((user) => {
      return user.userType === 'User';
    });
    this.props.getStatisticById(userObj.user._id);
  }
  conversationToChat(id) {
    return this.props.conversations.find((e) => {
      return e._id === id;
    });
  }

  render() {
    const idToRender = this.props.conversationToRenderId || null;
    const convToChat = idToRender ? this.conversationToChat(idToRender) : null;
    return (
      <div>
        {!idToRender ? <div className={styles['big-conversation-list']}>
          <ConversationList
            setStatistic={this.getIdForStatistic}
            conversations={this.props.conversations}
            setConversation={this.props.setConversation}
            chosenTheme={this.props.chosenTheme}
          />
        </div>
          : <div className={styles['small-conversation-list']}>
            <div className={styles.conversations}>
              <ConversationList
                setStatistic={this.getIdForStatistic}
                conversations={this.props.conversations}
                setConversation={this.props.setConversation}
                nowActive={this.props.conversationToRenderId}
                removeConversations={this.props.removeConversations}
                chosenTheme={this.props.chosenTheme}
              />
            </div>
            <div className={styles.chat}>
              <Chat
                conversationToRender={convToChat}
                dispatch={this.props.dispatch}
                chosenTheme={this.props.chosenTheme}
              />
            </div>
            <div className={styles.info}>
              <UserInfo statistic={this.props.statisticById} />
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conversations: state.conversationsInfo.conversations,
    conversationToRenderId: state.conversationsInfo.conversationToRenderId,
    statisticById: state.statistics.statisticById,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllConversations: () => {
      dispatch(getAllConversations());
    },
    setConversation: (id) => {
      dispatch(setConversation(id));
    },
    removeConversations: () => {
      dispatch(removeConversations());
    },
    getStatisticById: (id) => {
      dispatch(StatisticActions.getStatisticById(id));
    },
    dispatch
  };
};

Respond.propTypes = {
  getAllConversations: propTypes.func.isRequired,
  getStatisticById: propTypes.func.isRequired,
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
  conversationToRenderId: propTypes.string,
  setConversation: propTypes.func.isRequired,
  removeConversations: propTypes.func.isRequired,
  dispatch: propTypes.func.isRequired,
  statisticById: propTypes.shape({
    userId: propTypes.any,
    currentUrl: propTypes.string,
    viewedUrls: propTypes.arrayOf(propTypes.string),
    browserLanguage: propTypes.string,
    geoLocation: propTypes.string,
    online: propTypes.bool,
    coordinates: propTypes.string,
    userIpAddress: propTypes.string,
    country: propTypes.string,
    city: propTypes.string,
    screenWidth: propTypes.number,
    screenHeight: propTypes.number,
    userAgent: propTypes.string,
    timeZone: propTypes.string,
    signedUpDate: propTypes.any,
    sessionsCounts: propTypes.number,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Respond);
