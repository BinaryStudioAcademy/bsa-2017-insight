import React from 'react';
import styles from './styles.scss';
// import { validated } from 'react-custom-validation';
import validator from 'validator';

class UserRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
      formValues: {
        firstName: '',
        lastName: '',
        userName: '',
        password1: '',
        password2: '',
      },
    };
    this.sendForm = this.sendForm.bind(this);
  }

  formValuesSaver(field, filledField) {
    this.setState({
      formValues: Object.assign(this.state.formValues, {
        [field]: filledField.value.toString(),
      }),
    });
    console.log(this.state);
  }

  formValidator() {
    const errors = [];
    if (!validator.isLength(this.state.formValues.firstName, { min: 2 })) {
      errors.push('Please enter your first name (it should be longer than 2 letters)');
    }
  }

  sendForm(e) {
    e.preventDefault();
    this.formValidator();
    const formData = new FormData(e.target);
    fetch('/api/user/registration/', {
      method: 'POST',
      body: formData,
      redirect: 'follow',
      credentials: 'include',
    }).then(response => response.json()).then((response) => {
      this.setState({ info: response.text });
    });
  }

  render() {
    return (
      <div className={styles['login-form']}>
        <h3>User registration</h3>
        <hr />
        <form onSubmit={this.sendForm} encType="multipart/form-data">
          <div className={styles['get-data']}>
            <span>First Name*</span>
            <input
              type="text"
              name="firstName"
              required
              onChange={e => this.formValuesSaver('firstName', e.target)}
            />
          </div>
          <div className={styles['get-data']}>
            <span>Last Name*</span>
            <input
              type="text"
              name="lastName"
              required
              onChange={e => this.formValuesSaver('lastName', e.target)}
            />
          </div>
          <div className={styles['get-data']}>
            <span>Date of birth*</span>
            <input
              type="date"
              name="dateOfBirth"
              required
            />
          </div>
          <div className={styles['get-data']}>
            <span>Gender</span>
            <div>
              <input type="radio" name="gender" value="Male" id="male" /><label htmlFor="male">Male</label>
              <input type="radio" name="gender" value="Female" id="female" /><label htmlFor="female">Female</label>
            </div>
          </div>
          <div className={styles['get-data']}>
            <span>Username*</span>
            <input
              type="text"
              name="username"
              required
              onChange={e => this.formValuesSaver('userName', e.target)}
            />
          </div>
          <div className={styles['get-data']}>
            <span>Email*</span>
            <input type="email" name="email" required />
          </div>
          <div className={styles['get-data']}>
            <span>Password*</span>
            <input
              type="password"
              name="firstPassword"
              required
              onChange={e => this.formValuesSaver('password1', e.target)}
            />
          </div>
          <div className={styles['get-data']}>
            <span>Confirm password*</span>
            <input
              type="password"
              name="secondPassword"
              required
              onChange={e => this.formValuesSaver('password2', e.target)}
            />
          </div>
          <div className={styles['get-data']}>
            <span>Company</span>
            <input type="text" name="company" />
          </div>
          <div className={styles['get-data']}>
            <span>Avatar</span>
            <div><input type="file" name="avatar" /></div>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <br />
        <div className={styles['error-message']}>{this.state.info}</div>
      </div>
    );
  }
}

export default UserRegistration;
