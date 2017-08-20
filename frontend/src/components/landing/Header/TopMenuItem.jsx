import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class TopMenuItem extends React.Component {
  render() {
    if (this.props.submenu) {
      let i = 0;
      this.submenu = this.props.submenu.map((elem) => {
        i += 1;
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

TopMenuItem.propTypes = {
  submenu: PropTypes.arrayOf(PropTypes.object),
  link: PropTypes.string,
  name: PropTypes.string
};

export default TopMenuItem;
