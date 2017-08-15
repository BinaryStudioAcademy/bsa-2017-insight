import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class HomeContentProduct extends React.Component {
  render() {
    return (
      <div className={styles['home-content-product']}>
        <img src={this.props.image} alt={''} />
        <h3>{this.props.name}</h3>
        <span>{this.props.description}</span>
        <Link to={this.props.link}>Learn more...</Link>
      </div>
    );
  }
}

HomeContentProduct.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
};

export default HomeContentProduct;
