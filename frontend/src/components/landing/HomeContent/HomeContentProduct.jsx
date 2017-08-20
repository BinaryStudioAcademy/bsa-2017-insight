import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class HomeContentProduct extends React.Component {
  render() {
    return (
      <div className={styles['home-content-product']}>
        <img src={this.props.image} alt={''} />
        <h3>{this.props.name}</h3>
        <span>{this.props.description}</span>
        <NavLink to={this.props.link}>Learn more...</NavLink>
      </div>
    );
  }
}

HomeContentProduct.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string
};

export default HomeContentProduct;
