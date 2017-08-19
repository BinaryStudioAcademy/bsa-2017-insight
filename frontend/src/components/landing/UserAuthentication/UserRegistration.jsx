import React from 'react';
import styles from './styles.scss';

class UserRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { info: '' };
    this.sendForm = this.sendForm.bind(this);
  }


  sendForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch('/api/user/registration/', {
      method: 'POST',
      body: formData,
      redirect: 'follow',
      credentials: 'include'
    }).then(response => response.json()).then((response) => {
      this.setState({ info: response.text });
    });
  }

  render() {
    return (
      <div className={styles['login-form']}>
        <h3>User registration</h3>
        <form onSubmit={this.sendForm} encType="multipart/form-data">
          <div className={styles['get-data']}>
            <span>First Name</span>
            <input type="text" name="firstName" required />
          </div>
          <div className={styles['get-data']}>
            <span>Last Name</span>
            <input type="text" name="lastName" required />
          </div>
          <div className={styles['get-data']}>
            <span>Date of birth</span>
            <input type="date" name="dateOfBirth" required />
          </div>
          <div className={styles['get-data']}>
            <span>Gender</span>
            <div>
              <input type="radio" name="gender" value="Male" id="male" required /><label htmlFor="male">Male</label>
              <input type="radio" name="gender" value="Female" id="female" required /><label htmlFor="female">Female</label>
            </div>
          </div>
          <div className={styles['get-data']}>
            <span>Username (Login)</span>
            <input type="text" name="username" required />
          </div>
          <div className={styles['get-data']}>
            <span>Email</span>
            <input type="email" name="email" required />
          </div>
          <div className={styles['get-data']}>
            <span>Password</span>
            <input type="password" name="firstPassword" required />
          </div>
          <div className={styles['get-data']}>
            <span>Confirm password</span>
            <input type="password" name="secondPassword" required />
          </div>
          <div className={styles['get-data']}>
            <span>Company</span>
            <input type="text" name="company" required />
          </div>
          <div className={styles['get-data']}>
            <span>Avatar</span>
            <div><input type="file" name="avatar" /></div>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <br />
        {this.state.info}
      </div>
    );



    // return (
    //   <div className={styles['login-form']}>
    //     <h3>User registration</h3>
    //     <hr />
    //     <div className={styles['get-data']}>
    //       <p>Username: </p>
    //       <input type="text"name="username" onChange={this.setInput} />
    //     </div>
    //     <div className={styles['get-data']}>
    //       <p>Enter your password</p>
    //       <input type="password" name="password" onChange={this.setInput} />
    //     </div>
    //     {/* <div className={styles['remember-me']}>
    //       <input type="checkbox" id="rememberMe" />
    //       <label htmlFor="rememberMe">Remember me</label><br />
    //     </div> */}
    //     <button type="button" onClick={this.login}>Log in</button><br />
    //     {this.state.info}
    //   </div>
    // );
  }
}

export default UserRegistration;
