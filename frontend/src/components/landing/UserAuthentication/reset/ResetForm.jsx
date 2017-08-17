import React from 'react';
import styles from '../styles.scss';

class ResetForm extends React.Component {
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

    fetch(`/api/reset/${this.props.match.params.userType}/${this.props.match.params.token}`, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({ info: response.text });
      });
  }

  render() {
    console.log(this.props);
    return (
      <div className={styles['login-form']}>
        <h3>Enter a new password</h3>
        <div className={styles['get-data']}>
          <span>New password:</span>
          <input type={'password'} name={'firstPassword'} onChange={this.setPassword} />
        </div>
        <div className={styles['get-data']}>
          <span>Confirm password:</span>
          <input type={'password'} name={'secondPassword'} onChange={this.setPassword} />
        </div>
        <button onClick={this.confirmPassword}>Update</button>
        <div>{this.state.info}</div>
      </div>
    );
  }
}

export default ResetForm;