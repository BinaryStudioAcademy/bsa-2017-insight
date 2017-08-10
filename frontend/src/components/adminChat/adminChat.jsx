import React, { Component } from 'react';
import ChatList from '../chatList/chatList.jsx';

class AdminChat extends Component {  
    render() {
        return (
            <ul>
                <ChatList />
            </ul>
        )
    }
}

export default AdminChat