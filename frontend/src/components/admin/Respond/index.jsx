import React from "react"
import ConversationList from "./ConversationList"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import * as ConversationActions from "../../../actions/conversationActions"


class Respond extends React.Componet {

    // call action on component will mount
    // recive state 

    render(){
        return (
            // if we have not conversationToRender >> render   ConversationList
            // put into props conversations from state , and action that will get id for conversationToRender
         <ConversationList conversations={this.props.conversations}/>
            // if we have conversationToRender >>
            // render ConversationList, Chat-component and UserInfo component 
            // put into props  conversationToRender
        )
  }
   
}

export default Respond

const  mapStateToProps = (state) => {
   return {
    conversations : state.conversations,
    conversationToRender : state.conversationToRender
   } 
}

const mapDispatchToProps = (dispatch) => {
    bindActionCreators(ConversationActions,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Respond)
