import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.scss';

class RestoreForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
      email: '',
    };
    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail() {
    const userType = this.props.match.params.userType;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.state.email, userType }),
    };

    fetch(`${window._injectedData.insightHost}/api/forgot`, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.text === 'ok') {
          return this.props.history.push('/forgot/success');
        }
        return this.setState({ info: response.text });
      });
  }

  render() {
    return (
      <div className={styles['login-form']}>
        <h3>Enter your email to proceed:</h3>
        <hr /><br />
        <input
          className={styles['restore-email']}
          type={'email'}
          name={'email'}
          onChange={(e) => { this.setState({ email: e.target.value }); }}
        /><br />
        <button onClick={this.sendEmail}>Reset</button>
        <div className={styles['error-message']}>{this.state.info}</div>
      </div>
    );
  }
}

RestoreForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      userType: PropTypes.string,
    }),
  }),
};

export default RestoreForm;
