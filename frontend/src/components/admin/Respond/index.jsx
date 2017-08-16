import React from 'react';
import { connect } from 'react-redux';
import ConversationList from './ConversationList';
import { bindActionCreators } from 'redux';
import { getAllConversations, setConversation } from '../../../actions/conversationsActions';
import * as StatisticActions from '../../../actions/statisticActions';
import Chat from './../chatAdmin/ChatAdmin';
import UserInfo from './../UserInfo/UserInfo';


class Respond extends React.Component {
  constructor() {
    super();
    this.conversationToChat = this.conversationToChat.bind(this);
  }

  componentWillMount() {
    this.props.getAllConversations();
  }

  conversationToChat(id) {
    return this.props.conversations.find((e) => {
      return e._id === id;
    });
  }

  render() {
    const idToRender = this.props.conversationToRenderId || null;
    console.log('idToRender', idToRender);
    const convToChat = idToRender ? this.conversationToChat(idToRender.id) : null;
    console.log('convToChat', convToChat);
    this.props.getStatisticById('599410e69927b53894701781');
    return (
      <div>
        {!idToRender ? <div>
            <ConversationList
              conversations={this.props.conversations}
              setConversation={this.props.setConversation}
            />
          </div>
          : <div>
            <ConversationList
              conversations={this.props.conversations}
              setConversation={this.props.setConversation} />
            <Chat conversationToRender={convToChat} dispatch={this.props.dispatch} />
          </div>
        }
      </div>
    );
  }
};
            // <UserInfo statistic={this.props.statisticById} />

const mapStateToProps = (state) => {
  return {
    conversations: state.conversationsInfo.conversations,
    conversationToRenderId: state.conversationsInfo.conversationToRenderId,
    statisticById: state.userStatistics.statisticById,
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
    getStatisticById: (id) => {
      dispatch(StatisticActions.getStatisticById(id));
    },
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Respond)
