import React from 'react';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.confirmPassword = this.confirmPassword.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.state = {
      firstPassword: '',
      secondPassword: '',
      info: '',
    };
  }

  setPassword(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  confirmPassword() {
    if (this.state.firstPassword !== this.state.secondPassword) {
      return this.setState({ info: 'Passwords do\'nt match' });
    }
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: this.state.secondPassword }),
      redirect: 'follow',
    };

    fetch(`/api/reset/${this.props.match.params.token}`, options)
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
        <span>New password:</span>
        <br />
        <input type={'password'} name={'firstPassword'} onChange={this.setPassword} />
        <br />
        <span>Confirm password:</span>
        <br />
        <input type={'password'} name={'secondPassword'} onChange={this.setPassword} />
        <br />
        <button onClick={this.confirmPassword}>Update</button>
        <div>{this.state.info}</div>
      </div>
    );
  }
}

export default ResetPassword;
