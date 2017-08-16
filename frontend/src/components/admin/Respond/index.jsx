import React from "react"
import ConversationList from "./ConversationList"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import * as ConversationActions from "../../../actions/conversationActions"


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
        console.log(this.props)
        let idToRender = this.props.conversationIdToRender || null
        let convToChat = idToRender ? this.conversationToChat(idToRender.id) : null
        console.log(convToChat)
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
                             <div>CHAT</div>
                             </div>
            }
            </div>
          )
  }
   
}

        
const  mapStateToProps = (state) => {
    
   return {
    conversations : state.conversationsState.conversations,
    conversationIdToRender : state.conversationsState.conversationToRender
   } 
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators(ConversationActions,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Respond)
