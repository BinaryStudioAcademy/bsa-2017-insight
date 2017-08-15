import React from "react"
import SingleConversation from "../SingleConversation"


const ConversationList = (props) =>{

   return (

       props.conversations.map(()=>{
            return <SingleConversation/>
       })
       
   ) 
}


