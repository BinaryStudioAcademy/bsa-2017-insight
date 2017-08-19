import React from 'react';
import styles from './styles.scss';

class IncorrectRoute extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        Page not found
      </div>
    );
  }
}

export default IncorrectRoute;
