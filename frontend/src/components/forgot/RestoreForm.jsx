import React from 'react';

class RestoreForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
      email: '',
    };
    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail() {
    const userType = this.props.match.params.userType;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.state.email, userType }),
    };

    fetch('/api/forgot', options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if(response.text === 'ok') {
          return this.props.history.push('/forgot/success');
        }
        this.setState({ info: response.text });
      });
  }

  render() {
    console.log(this.props);
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

export default RestoreForm;
