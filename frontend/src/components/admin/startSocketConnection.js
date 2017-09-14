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
    if (message.author.userType === 'User') {
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
    if (data.to !== window._injectedData._id) return;
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
  this.socket.on('newMessageToRespond', () => {
    this.props.getAllConversations();
  });
}

export default startSocketConnection;
