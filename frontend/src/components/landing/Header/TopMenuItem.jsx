import React from 'react';
import { Link } from 'react-router';
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
            <Link to={elem.link}>{elem.name}</Link>
          </li>
        );
      });
    }
    return (
      <li className={styles['top-menu-item']}>
        <Link
          to={this.props.link}
        >
          {this.props.name}
        </Link>
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
  name: PropTypes.string,
};

export default TopMenuItem;
