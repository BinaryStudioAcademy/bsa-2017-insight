import io from './../../../../node_modules/socket.io-client/dist/socket.io';
import { fetchMessage, getAllConversations } from './../../actions/conversationsActions';
import { getStatisticById } from './../../actions/statisticActions';

function startSocketConnection(dispatch) {
  const id = window._injectedData._id;
  this.socket = io(window._injectedData.insightHost);
  const userObj = {
    type: 'Admin',
    id,
  };
  this.socket.emit('userId', userObj);

  this.socket.on('unreadNewMessage', (message) => {
    dispatch(fetchMessage(message));
  });
  this.socket.on('introduced', (data) => {
    dispatch(getAllConversations());
    dispatch(getStatisticById(data.id));
  });

  this.socket.on('newMessage', (message) => {
    const admin = window._injectedData;
    const isParticipant = admin.conversations.find((conversation) => {
      return conversation === message.conversationId;
    });
    if (message.author.userType === 'User' && isParticipant) {
      const messageCopy = { ...message };
      messageCopy.isReceived = true;
      this.socket.emit('newMessageReceived', { type: 'Admin', id: message._id });
      dispatch(fetchMessage(messageCopy));
    } else {
      dispatch(fetchMessage(message));
    }
  });

  this.socket.on('newConversationCreated', (data) => {
    let notification;
    const handler = () => {
      this.props.navigateToConversation('unpicked', data.conversation._id);
      this.props.getStatisticById(data.conversation.participants[0].user);
      this.context.router.history.replace('/admin/messenger');
      notification.close();
    };
    if (!('Notification' in window)) {
      return console.log('Notifications are not supported');
    } else if (Notification.permission === 'granted') {
      notification = new Notification('New unpicked conversation. Click to open');
      notification.onclick = handler;
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          notification = new Notification('New unpicked conversation. Click to open');
          notification.onclick = handler;
        }
        return permission;
      });
    }
    return notification;
  });

  this.socket.on('reassigned conversation', (data) => {
    const admin = window._injectedData;
    if (data.to !== admin._id) return;
    if(admin.reassignedConversations) {
      admin.reassignedConversations.push(data.conversationId);
    } else {
      admin.reassignedConversations = [data.conversationId];
    }
    this.props.updateReassignedConversations(window._injectedData.reassignedConversations);
    let notification;
    const handler = () => {
      this.props.getStatisticById(data.userId);
      this.props.navigateToConversation('mine', data.conversationId);
      this.context.router.history.replace('/admin/messenger');
      notification.close();
    };
    if (Notification.permission === 'granted') {
      notification = new Notification('You have been assigned a new conversation. Click to open');
      notification.onclick = handler;
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          notification = new Notification('You have been assigned a new conversation. Click to open');
          notification.onclick = handler;
        }
        return permission;
      });
    }
  });

  this.socket.on('reassignedConversationSeenOk', (conversationId) => {
    const admin = window._injectedData;
    const index = admin.reassignedConversations.findIndex((conversation) => {
      return conversation === conversationId;
    });
    admin.reassignedConversations.splice(index, 1);
    this.props.setReassignToFalse(conversationId);
    this.props.updateReassignedConversations(window._injectedData.reassignedConversations);
  });

  this.socket.on('newMessageToRespond', (message) => {
    if(this.props.conversationToRenderId === message.conversationId) {
      return;
    } else {
      const admin = window._injectedData;
      const isParticipant = admin.conversations.find((conversation) => {
        return conversation === message.conversationId;
      });
      if(!isParticipant) {
        return;
      }
      window._injectedData.unreadMessages.push(message.conversationId);

      this.props.conversations.forEach((conversation) => {
        if(conversation._id === message.conversationId) {
          dispatch(fetchMessage(message));
        }
      });
      
      this.props.updateUnreadMessages(window._injectedData.unreadMessages);

      let notification;
      const handler = () => {
        this.props.getStatisticById(message.author.item._id);
        this.props.navigateToConversation('mine', message.conversationId);
        // this.context.router.history.replace('/admin/messenger');
        notification.close();
      };
      if (Notification.permission === 'granted') {
        notification = new Notification(`${message.author.item.firstName} ${message.author.item.lastName || ''}: ${message.body}`);
        notification.onclick = handler;
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission((permission) => {
          if (permission === 'granted') {
            notification = new Notification(`${message.author.item.firstName} ${message.author.item.lastName || ''}: ${message.body}`);
            notification.onclick = handler;
          }
          return permission;
        });
      }

    }
  });
}

export default startSocketConnection;
