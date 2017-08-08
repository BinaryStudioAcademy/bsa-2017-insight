import React from 'react';
import styles from './styles.scss';

class Hello extends React.Component {
  render() {
    return (
      <div className={styles['project-name']}>Insight</div>
    )
  }
}

export default Hello;