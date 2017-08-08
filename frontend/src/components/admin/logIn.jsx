import React from 'react';
import Paper from 'material-ui/Paper';
import authService from './services/authService';

class LogIn extends React.Component {
  
  login() {
    authService.logIn().then((data) => {
      console.log(data);
    });
  }
  
  
  render() {
    return (
      <div className="login-page">
        <div className="form">
          <Paper style={{width: '400px', height: '300px', margin: 'auto', top: '20vh', position: 'relative'}}
                 zDepth={2}>
            <form>
              <input type="text" name="email" placeholder="email" />
              <input type="text" name="email" placeholder="password" />
              <button type="submit" name="submitBtn" onClick={this.login()}>Sign in</button>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

export default LogIn;