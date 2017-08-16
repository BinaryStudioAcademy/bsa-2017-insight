import React from 'react';

class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
      email: '',
    };
    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail() {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.state.email }),
    };

    fetch('/api/forgot', options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({ info: response.text });
      });
  }

  render() {
    return (
      <div>
        <span>Enter your email:</span>
        <br />
        <input type={'email'} name={'email'} onChange={(e) => { this.setState({ email: e.target.value }); }} />
        <button onClick={this.sendEmail}>Reset</button>
        <div>{this.state.info}</div>
      </div>
    );
  }
}

export default Forgot;
