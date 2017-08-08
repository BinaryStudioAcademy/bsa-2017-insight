import React from 'react';
import styles from './styles.scss';

class Hello extends React.PureComponent {
  render() {
    return (
      <div className={styles['project-name']}>Insight</div>
    );
  }
}

export default Hello;
