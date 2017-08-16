import React from 'react';

class AdminLogin extends React.Component {
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

    fetch('/api/admin/login', {
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
      <div>
        <div>ADMIN LOGIN</div>
        Username:<br />
        <input type="text"name="username" onChange={this.setInput} />
        <br />
        Password:<br />
        <input type="password" name="password" onChange={this.setInput} />
        <br />
        <button type="button" onClick={this.login}>Login</button>
        <br />
        {this.state.info}
      </div>
    );
  }
}

export default AdminLogin;
