import React from 'react';
import propTypes from 'prop-types';
import ChatIcon from './ChatIcon/chatIcon';
import Chat from './Chat/Chat';
import Trigger from './Trigger';

class ChatWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/widgets/localhost3000')
      .then(response => response.json())
      .then((data) => {
        this.setState({ widgetStyles: data.options });
      });
  }

  render() {
    return this.state.widgetStyles ? (
      <div>
        {this.props.isOpen ?
          <Chat
            widgetStyles={this.state.widgetStyles}
            onChatClose={this.props.toggleChat}
            force={this.props.force}
            forceWillBeFalse={this.props.forceWillBeFalse}
          /> :
          <ChatIcon onChatIconClick={this.props.toggleChat} widgetStyles={this.state.widgetStyles} />}
      </div>
    ) : null;
  }
}

ChatWidget.propTypes = {
  isOpen: propTypes.bool,
  toggleChat: propTypes.func,
  force: propTypes.bool,
  forceWillBeFalse: propTypes.func,
};


export default Trigger(ChatWidget);
