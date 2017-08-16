import React from "react";
import ConversationList from "./ConversationList";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as ConversationActions from "../../../actions/conversationActions";
import * as StatisticActions from "../../../actions/statisticActions";
import Chat from '../chatAdmin/ChatAdmin.jsx'


class Respond extends React.Component {
    constructor(){
        super()
        this.conversationToChat =  this.conversationToChat.bind(this)
    }
    componentWillMount(){
        this.props.getAllConversations()
    }

    conversationToChat(id){
       return this.props.conversations.find(e=>{
            return e._id === id
        })
    }

    render(){
        console.log(this.props.conversationIdToRender)
        let idToRender = this.props.conversationIdToRender || null
        let convToChat = idToRender ? this.conversationToChat(idToRender.id) : null
        this.props.getStatisticById("1111")
        
        return (
            <div>
            {
                !idToRender ? <div>
                              <ConversationList 
                                conversations={this.props.conversations} 
                                setConversation={this.props.setConversation}/>
                             </div> 
                            : <div>
                               <ConversationList 
                                conversations={this.props.conversations} 
                                setConversation={this.props.setConversation}/>
                             <Chat conversationToRender={convToChat} dispatch={this.props.dispatch}></Chat>
                             </div>
            }
            </div>
          )
  }
   
}

        
const  mapStateToProps = (state) => {
    
   return {
    conversations : state.conversationsState.conversations,
    conversationIdToRender : state.conversationsState.conversationToRender,
    statisticById: state.statisticState.statisticById
   } 
}

const mapDispatchToProps = (dispatch) => {
    return {
    getAllConversations: () => {
      dispatch(ConversationActions.getAllConversations());
    },
    setConversation: (id) => {
       dispatch(ConversationActions.setConversation(id));
    },
    getStatisticById: (id) => {
       dispatch(StatisticActions.getStatisticById(id));
    }
  };

}

export default connect(mapStateToProps,mapDispatchToProps)(Respond)
