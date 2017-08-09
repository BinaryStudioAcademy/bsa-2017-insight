import React from 'react';
import styles from './styles.scss';
import Logo from './Logo';
import TopMenu from './TopMenu';

class Header extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <Logo />
        <TopMenu />
      </div>
    );
  }
}

export default Header;
