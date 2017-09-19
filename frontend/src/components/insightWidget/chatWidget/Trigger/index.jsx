import React from 'react';
import Actions, { PATH_CHANGED } from './actions';
import checkPath from './logic';

const actions = new Actions();

const Trigger = (OriginalComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        force: null,
        body: '',
      };
      this.toggleChat = this.toggleChat.bind(this);
      this.timeToggle = this.timeToggle.bind(this);
      this.forceWillBeFalse = this.forceWillBeFalse.bind(this);
      this.timer = null;
    }

    componentDidMount() {
      fetch(`${window._injectedData.insightHost}/api/force-messages/all/${window._injectedData.currentAppId}`)
        .then(response => response.json())
        .then((forceMessages) => {
          actions.add(PATH_CHANGED, this, (data) => {
            checkPath(data, forceMessages);
          });
          actions.trigger(PATH_CHANGED, [this.timeToggle, window.location.pathname]);
        });
      window.addEventListener('click', () => {
        if (window._injectedData.urlHistory) {
          const url = window._injectedData.urlHistory;
          if (window.location.href !== url[url.length - 1]) {
            clearTimeout(this.timer);
            actions.trigger(PATH_CHANGED, [this.timeToggle, window.location.pathname]);
          }
        }
      });
    }

    toggleChat() {
      this.setState({ isOpen: !this.state.isOpen, force: false });
      clearTimeout(this.timer);
    }

    forceWillBeFalse() {
      this.setState({ force: false });
    }

    timeToggle(time, messageBody) {
      if (!this.state.isOpen) {
        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          console.log('timer cleared');
          this.setState({ isOpen: !this.state.isOpen, force: true, body: messageBody });
        }, time);
        console.log('timer started');
      }
    }

    render() {
      return (<OriginalComponent
        toggleChat={this.toggleChat}
        isOpen={this.state.isOpen}
        force={this.state.force}
        messageBody={this.state.body}
        forceWillBeFalse={this.forceWillBeFalse}
      />);
    }
  };
};

export default Trigger;
