import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class FooterColumn extends React.Component {
  render() {
    if (this.props.textItems) {
      let i = 0;
      this.items = this.props.textItems.map((item) => {
        i += 1;
        return (<li key={i}><NavLink to={item.link}>{item.name}</NavLink></li>);
      });
    } else if (this.props.imageItems) {
      let i = 0;
      this.items = this.props.imageItems.map((item) => {
        i += 1;
        return (<li key={i} className={styles['picture-list']}>
          <a href={item.link}>
            <img src={item.image} alt={''} />
          </a>
        </li>);
      });
    } else {
      this.items = '';
    }
    return (
      <div className={styles['footer-column']}>
        <h3>{this.props.heading}</h3>
        <ul>
          {this.items}
        </ul>
      </div>
    );
  }
}

FooterColumn.propTypes = {
  heading: PropTypes.string,
  textItems: PropTypes.arrayOf(PropTypes.object),
  imageItems: PropTypes.arrayOf(PropTypes.object)
};

export default FooterColumn;
