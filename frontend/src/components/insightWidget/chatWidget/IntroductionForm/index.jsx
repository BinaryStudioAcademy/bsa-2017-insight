import React from 'react';
import propTypes from 'prop-types';
import style from './styles.scss';


class IntroductionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      email: '',
      phone: '',
    };
    this.sendData = this.sendData.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
  }

  sendData(e) {
    e.preventDefault();
    if (this.state.firstName.length > 1 || this.state.email.length > 1 || this.state.phone.length > 1) {
      const introducedValues = {};
      introducedValues.body = { ...this.state };
      introducedValues.id = this.props.id;
      introducedValues.body.isIntroduced = true;
      this.props.socket.emit('introduced', introducedValues);
      this.setState({
        firstName: '',
        email: '',
        phone: '',
      });
      this.props.introductionIsClose(e);
    } else {
      console.log('Type something');
    }
  }

  handleName(e) {
    this.setState({ firstName: e.target.value });
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handlePhone(e) {
    this.setState({ phone: e.target.value });
  }


  render() {
    return (
      <form className={style['introduce-form']} onSubmit={e => this.sendData(e)} >
        <input placeholder="name" type="text" value={this.state.firstName} onChange={e => this.handleName(e)} />
        <input placeholder="email" type="email" value={this.state.email} onChange={e => this.handleEmail(e)} />
        <input placeholder="telephone number" type="tel" value={this.state.phone} onChange={e => this.handlePhone(e)} />
        <button onClick={this.props.introductionIsClose}>Skip</button>
        <button>Send</button>
      </form>
    );
  }
}

IntroductionForm.propTypes = {
  id: propTypes.string,
  introductionIsClose: propTypes.func,
  socket: propTypes.shape({
    emit: propTypes.func,
  }),
};

export default IntroductionForm;
