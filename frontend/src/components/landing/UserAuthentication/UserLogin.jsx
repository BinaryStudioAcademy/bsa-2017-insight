import React from 'react';
import styles from './styles.scss';

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { info: '' };
    this.login = this.login.bind(this);
    this.setInput = this.setInput.bind(this);
  }

  setInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  login(e) {
    e.preventDefault();

    const loginData = {
      username: this.state.username,
      password: this.state.password
    };

    if (!loginData.username || !loginData.password) {
      this.setState({
        info: 'Wrong username/password'
      });
      return;
    }

    fetch('/api/user/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(loginData),
      redirect: 'follow',
      credentials: 'include'
    }).then(response => response.json()).then((response) => {
      this.setState({ info: response.text });
    });
  }

  render() {
    return (
      <div className={styles['login-form']}>
        <h3>Sign into your account</h3>
        <hr />
        <div className={styles['get-data']}>
          <span>Username</span>
          <input type="text"name="username" onChange={this.setInput} />
        </div>
        <div className={styles['get-data']}>
          <span>Password</span>
          <input type="password" name="password" onChange={this.setInput} />
        </div>
        {/* <div className={styles['remember-me']}>
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">Remember me</label><br />
        </div> */}
        <button type="button" onClick={this.login}>Log in</button><br />
        {this.state.info}
      </div>
    );
  }
}

export default UserLogin;
