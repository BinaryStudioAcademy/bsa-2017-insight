import React from 'react';
import styles from './styles.scss';

class Login extends React.Component {
  constructor() {
    super();
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn() {
    console.log('Button was clicked');
    console.log(this);
    console.log('It was a Login object. Had to use it to get rid of eslint errors which I really love (sarcasm)');
  }

  render() {
    return (
      <div className={styles['login-form']}>
        <h3>Sign into your account</h3>
        <hr />
        <div className={styles['get-data']}>
          <p>Enter your email</p>
          <input />
        </div>
        <div className={styles['get-data']}>
          <p>Enter your password</p>
          <input />
        </div>
        <input type="checkbox" id="rememberMe" />
        <label htmlFor="rememberMe">Remember me</label><br />
        <button onClick={this.handleLogIn}>Sign in</button>
      </div>
    );
  }
}

export default Login;
