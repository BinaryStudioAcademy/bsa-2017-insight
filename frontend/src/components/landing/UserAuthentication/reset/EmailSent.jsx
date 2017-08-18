import React from 'react';
import styles from '../styles.scss';

class EmailSuccess extends React.Component {
  render() {
    return (
      <h2 className={styles['notification-text']} style={{ margin: '100px auto' }}>
        Instructions were sent to your email
      </h2>
    );
  }
}

export default EmailSuccess;