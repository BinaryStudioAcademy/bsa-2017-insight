import React from "react"
import SingleConversation from "../SingleConversation"


const ConversationList = (props) =>{

   return (
        <div>
            {props.conversations.map(e=>{
                return <div key={e._id} onClick={()=>props.setConversation(e._id)}>
                    <SingleConversation conversation={e} /> </div>
            })}
        </div>
             
    
       
   ) 
}


export default ConversationList