import React from 'react';
import { Link } from 'react-router';
import styles from './styles.scss';

class Logo extends React.Component {
  render() {
    return (
      <Link to="/" className={styles.logo}>
        <span>&nbsp;InSi</span>g<span>ht&nbsp;</span>
      </Link>
    );
  }
}

export default Logo;
