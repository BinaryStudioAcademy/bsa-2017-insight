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
        force: null
      };
      this.toggleChat = this.toggleChat.bind(this);
      this.timeToggle = this.timeToggle.bind(this);
      this.timer = null;
    }
    componentDidMount() {
      actions.add(PATH_CHANGED, this, checkPath);
    } 

    componentDidUpdate(prevProps) {

      if (prevProps.location.pathname !== this.props.location.pathname) {
        actions.trigger(PATH_CHANGED, [this.timeToggle, this.props.location.pathname]);
      }
    }


    toggleChat() {
      this.setState({ isOpen: !this.state.isOpen, force: false });
      clearTimeout(this.timer);
    }

    timeToggle(time) {
      if (!this.state.isOpen) {
        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          console.log('timer cleared');
          this.setState({ isOpen: !this.state.isOpen, force: true });
        }, time);
        console.log('timer started');
      }
    }
    render() {
      return (<OriginalComponent
        toggleChat={this.toggleChat}
        isOpen={this.state.isOpen}
        force={this.state.force}
      />);
    }
  };
};

export default Trigger;
