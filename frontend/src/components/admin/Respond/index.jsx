import React from "react"
import ConversationList from "./ConversationList"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import * as ConversationActions from "../../../actions/conversationActions"


class Respond extends React.Component {
    componentWillMount(){
  
     this.props.getAllConversations()
    }

    render(){

        return (
            
         <ConversationList conversations={this.props.conversations}/>
    
        )
  }
   
}// if we have not conversationToRender >> render   ConversationList
            // put into props conversations from state , and action that will get id for conversationToRender

        // if we have conversationToRender >>
            // render ConversationList, Chat-component and UserInfo component 
            // put into props  conversationToRender

const  mapStateToProps = (state) => {
   return {
    conversations : state.conversations,
    conversationToRender : state.conversationToRender
   } 
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators(ConversationActions,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Respond)
