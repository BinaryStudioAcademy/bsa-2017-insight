import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.scss';

class Header extends React.Component {
  render() {
    return (
      <div className={styles['header']}>
        <Logo />
        <TopMenu />
      </div>
    );
  }
}

class Logo extends React.Component {
  render() {
    return (
      <NavLink to="/" className={styles['logo']}>
        <span>&nbsp;InSi</span>g<span>ht&nbsp;</span>
      </NavLink>
    );
  }
}

class TopMenu extends React.Component {
  render() {
    return (
      <ul className={styles['top-menu']}>
        <TopMenuItem
          name={'Products'}
          link={'/'}
          submenu={[
            { name: 'Engage', link: '/engage' },
            { name: 'Respond', link: '/respond' },
          ]}
        />
        <TopMenuItem
          name={'Resources'}
          link={'/asdfa'}
          submenu={[
            { name: 'Customers', link: '/customers' },
            { name: 'Help center', link: '/help' },
          ]}
        />
        <TopMenuItem name={'Pricing'} link={'/pricing'} />
        <TopMenuItem name={'Log in'} link={'/login'} />
      </ul>
    );
  }
}

class TopMenuItem extends React.Component {
  render() {
    if (this.props.submenu) {
      this.submenu = this.props.submenu.map((elem, i) => {
        return (
          <li key={i}>
            <NavLink to={elem.link}>{elem.name}</NavLink>
          </li>
        );
      });
    }
    return (
      <li className={styles['top-menu-item']}>
        <NavLink
          to={this.props.link}
          onClick={e => this.submenu ? e.preventDefault() : ''}
        >
          {this.props.name}
        </NavLink>
        <ul>
          {this.submenu}
        </ul>
      </li>
    );
  }
}

export default Header;
