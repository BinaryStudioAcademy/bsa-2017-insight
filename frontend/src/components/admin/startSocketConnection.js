import io from './../../../../node_modules/socket.io-client/dist/socket.io';
import { fetchMessage, getAllConversations, updateConversations } from './../../actions/conversationsActions';
import { getStatisticById } from './../../actions/statisticActions';
import notification from '../../services/notification.js';

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
    let messageCopy = { ...message };
    if (message.author.userType === 'User' && isParticipant) {
      messageCopy.isReceived = true;
      this.socket.emit('newMessageReceived', { type: 'Admin', id: message._id });
    }
    const conversationIndex = this.props.conversations.findIndex((conversation) => {
      return conversation._id === message.conversationId;
    });
    const conversationCopy = { ...this.props.conversations[conversationIndex] };
    conversationCopy.messages.push(messageCopy);
    const newConversations = [...this.props.conversations];
    newConversations.splice(conversationIndex, 1, conversationCopy);
    dispatch(updateConversations(newConversations));
  });

  this.socket.on('newConversationCreated', (conversation) => {
    if(conversation.appId !== window._injectedData.appId) {
      return;
    }
    if(this.context.router.route.location.pathname === '/admin/messenger' && this.props.conversationFilters.activeGroup === 'unpicked') {
      const newConversations = [...this.props.conversations, conversation];
      dispatch(updateConversations(newConversations));
    }
    const handler = () => {
      this.props.getStatisticById(conversation.participants[0].user._id);
      this.socket.emit('switchRoom', conversation._id);
      this.socket.emit('adminConnectedToRoom', conversation._id);
      if(this.context.router.route.location.pathname === '/admin/messenger') {
        if(this.props.conversationFilters.activeGroup === 'unpicked') {
          this.props.navigateToConversation(false, conversation._id);
        } else {
          this.props.navigateToConversation('unpicked', conversation._id);
        }
      } else {
        this.props.navigateToConversation('unpicked', conversation._id);
        this.context.router.history.replace('/admin/messenger');
      }
    };

    notification.create('New unpicked conversation', {
      body: 'Click to open',
      handler,
    });
  });

  this.socket.on('reassigned conversation', (data) => {
    const admin = window._injectedData;
    if(data.appId !== admin.appId || data.to !== admin._id) {
      return;
    }

    admin.reassignedConversations.push(data.conversationId);
    admin.conversations.push(data.conversationId);

    const conversationIndex = this.props.conversations.findIndex((conversation) => {
      return conversation._id === data.conversationId;
    });

    if(conversationIndex === -1) {
      if(this.context.router.route.location.pathname === '/admin/messenger' &&
        (this.props.conversationFilters.activeGroup === 'mine' || this.props.conversationFilters.activeGroup === 'all')
        ) {
        const newConversations = [...this.props.conversations, data.reassignedConversation];
        dispatch(updateConversations(newConversations));
      }
    } else {
      const newConversations = [...this.props.conversations];
      newConversations.splice(conversationIndex, 1, data.reassignedConversation);
      dispatch(updateConversations(newConversations));
    }
    this.props.updateReassignedConversations(window._injectedData.reassignedConversations);
    const handler = () => {
      this.props.getStatisticById(data.userId);
      this.socket.emit('switchRoom', data.conversationId);
      this.socket.emit('adminConnectedToRoom', data.conversationId);
      if(this.context.router.route.location.pathname === '/admin/messenger') {
        if(this.props.conversationFilters.activeGroup === 'mine' || this.props.conversationFilters.activeGroup === 'all') {
          this.props.navigateToConversation(false, data.conversationId);
        } else {
          this.props.navigateToConversation('mine', data.conversationId);
        }
      } else {
        this.props.navigateToConversation('mine', data.conversationId);
        this.context.router.history.replace('/admin/messenger');
      }
    };
    notification.create('You have been assigned a new conversation', {
      body: 'Click to open',
      handler,
    });
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
    const admin = window._injectedData;
    if(message.appId !== admin.appId) {
      return;
    }
    const isParticipant = admin.conversations.find((conversation) => {
      return conversation === message.conversationId;
    });
    if(isParticipant && this.props.conversationToRenderId !== message.conversationId) {
      window._injectedData.unreadMessages.push(message.conversationId);
      this.props.updateUnreadMessages(window._injectedData.unreadMessages);
      const handler = () => {
        this.props.getStatisticById(message.author.item._id);
        this.socket.emit('switchRoom', message.conversationId);
        this.socket.emit('adminConnectedToRoom', message.conversationId);
        if(this.context.router.route.location.pathname === '/admin/messenger') {
          if(this.props.conversationFilters.activeGroup === 'mine' || this.props.conversationFilters.activeGroup === 'all') {
            this.props.navigateToConversation(false, message.conversationId);
          } else {
            this.props.navigateToConversation('mine', message.conversationId);
          }
        } else {
          this.props.navigateToConversation('mine', message.conversationId);
          this.context.router.history.replace('/admin/messenger');
        }
      };
      notification.create('NEW MESSAGE', {
        body: `${message.author.item.firstName || message.author.item.username} ${message.author.item.lastName || ''}: ${message.body}`,
        handler,
      });
    }

    const conversationIndex = this.props.conversations.findIndex((conversation) => {
      return conversation._id === message.conversationId;
    });
    if(conversationIndex !== -1 && this.props.conversationToRenderId !== message.conversationId) {
      const conversationCopy = { ...this.props.conversations[conversationIndex] };
      conversationCopy.messages.push(message);
      const newConversations = [...this.props.conversations];
      newConversations.splice(conversationIndex, 1, conversationCopy);
      dispatch(updateConversations(newConversations));
    }
  });
}

export default startSocketConnection;
