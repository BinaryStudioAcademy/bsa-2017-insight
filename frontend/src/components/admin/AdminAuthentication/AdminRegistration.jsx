import React from 'react';

class AdminRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { info: '' };
    this.sendForm = this.sendForm.bind(this);
  }


  sendForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch('/api/admin/registration/', {
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
      <div>
        <div>ADMIN REGISTRATION</div>
        <form onSubmit={this.sendForm} encType="multipart/form-data">
          <span>First Name</span><br />
          <input type="text" name="firstName" required /><br />
          <span>Last Name</span><br />
          <input type="text" name="lastName" required /><br />
          <span>Gender</span><br />
          <input type="radio" name="gender" value="Male" required /> Male
          <input type="radio" name="gender" value="Female" required /> Female
          <br />
          <span>Username</span><br />
          <input type="text" name="username" required /><br />
          <span>Email</span><br />
          <input type="email" name="email" required /><br />
          <span>Password</span><br />
          <input type="password" name="firstPassword" required /><br />
          <span>Confirm password</span><br />
          <input type="password" name="secondPassword" required /><br />
          <span>Avatar</span><br />
          <input type="file" name="avatar" />
          <br />
          <button type="submit">Sign Up</button>
        </form>
        <br />
        {this.state.info}
      </div>
    );
  }
}

export default AdminRegistration;
