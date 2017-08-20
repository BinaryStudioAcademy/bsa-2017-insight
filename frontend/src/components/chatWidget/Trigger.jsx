import React from 'react';

const Trigger = (OriginalComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false
      };
      this.toggleChat = this.toggleChat.bind(this);
      this.timeToggle = this.timeToggle.bind(this);
      this.phrase = null;
      this.timeOut = 7000;
      this.timeOutOnTheSamePage = 60000;
      this.timer = null;
    }
    componentDidMount() {
      this.timeToggle(this.timeOut);
    }  

    componentDidUpdate(prevProps) {
      if (prevProps.location.pathname !== this.props.location.pathname) {
        this.timeToggle(this.timeOut);
      } else if (prevProps.location.pathname === this.props.location.pathname) {
        this.timeToggle(this.timeOutOnTheSamePage);
      }
    }

    toggleChat() {
      this.phrase = null;
      this.setState({ isOpen: !this.state.isOpen });
      clearTimeout(this.timer);
    }

    timeToggle(time) {
      if (!this.state.isOpen) {
        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          this.phrase = 'Maybe we can help You?'
          this.setState({ isOpen: !this.state.isOpen });
        }, time);
      }
    }
    
    render() {
      return <OriginalComponent toggleChat={this.toggleChat} isOpen={this.state.isOpen} phrase={this.phrase} />;
    }
  }
}

export default Trigger;
