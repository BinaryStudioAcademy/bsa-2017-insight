import React from 'react';
import styles from '../styles.scss';

class InvalidToken extends React.Component {
  render() {
    return (
      <h2 className={styles['notification-text']} style={{ margin: '100px auto' }}>
        Password reset token is invalid or has expired
      </h2>
    );
  }
}

export default InvalidToken;
