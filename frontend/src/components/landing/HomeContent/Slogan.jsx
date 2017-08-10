import React from 'react';
import styles from './styles.scss';

class Slogan extends React.Component {
  render() {
    return (
      <h2 className={styles.slogan}>
        We are here
        <br />to <span>help you
          <br />stay in touch</span>
        <br />with your customers
      </h2>
    );
  }
}

export default Slogan;
