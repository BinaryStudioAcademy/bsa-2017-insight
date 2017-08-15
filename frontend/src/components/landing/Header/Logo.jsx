import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.scss';

class Logo extends React.Component {
  render() {
    return (
      <NavLink to="/" className={styles.logo}>
        <span>&nbsp;InSi</span>g<span>ht&nbsp;</span>
      </NavLink>
    );
  }
}

export default Logo;
