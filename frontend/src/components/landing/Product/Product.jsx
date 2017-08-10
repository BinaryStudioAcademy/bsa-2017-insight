import React from 'react';
import styles from './styles.scss';

class Product extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.product}>
          <img src="http://via.placeholder.com/500x500" alt="product" />
          <div className={styles.description}>
            <h2>Support customers personally at scale with Intercom’s help desk</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
             dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
             ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do ...</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
