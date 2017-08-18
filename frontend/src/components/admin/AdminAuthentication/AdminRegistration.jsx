import React from 'react';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';

class AdminRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { info: '' };
    this.sendForm = this.sendForm.bind(this);
  }

  // validateForm(formData) {
  //   console.log(formData);
  // }

  sendForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    // this.validateForm(formData);
    fetch('/api/admin/registration/', {
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
      <div
        style={{ width: '500px', margin: '50px auto', textAlign: 'center' }}
      >
        <h2>Admin registration</h2>
        <form
          onSubmit={this.sendForm}
          encType="multipart/form-data"
        >
          <TextField
            type={'text'}
            name={'firstName'}
            required
            hintText={'First Name*'}
          /><br />
          <TextField
            type={'text'}
            name={'lastName'}
            required
            hintText={'Last Name*'}
          /><br />
          <TextField
            type={'text'}
            name={'username'}
            required
            hintText={'Username*'}
          /><br />
          <TextField
            type={'email'}
            name={'email'}
            required
            hintText={'Email*'}
          /><br />
          <TextField
            type={'password'}
            name={'firstPassword'}
            required
            hintText={'Password*'}
          /><br />
          <TextField
            type={'password'}
            name={'secondPassword'}
            required
            hintText={'Confirm password*'}
          /><br /><br />
          <RadioButtonGroup name={'gender'}>
            <RadioButton value="Male" label={'Male'} style={{ width: '100px', display: 'inline-block' }} />
            <RadioButton value="Female" label={'Female'} style={{ width: '100px', display: 'inline-block' }} />
          </RadioButtonGroup><br />
          <RaisedButton
            name={'avatar'}
            label={'Choose your avatar image'}
          >
            <input
              type={'file'}
              style={{
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0,
                zIndex: 10
              }}
            />
          </RaisedButton>
          <br /><br />
          <RaisedButton
            type={'submit'}
            label={'Sign Up'}
            style={{ margin: '10px 0' }}
            primary
          />
        </form>
        {this.state.info}
      </div>
    );
  }
}

export default AdminRegistration;
