import React from 'react';
import styles from './styles.scss';
import Header from './Header/Header';
import LeftSideMenu from './LeftSideMenu/LeftSideMenu';
import Table from './Table/Table';

class AdminPage extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Header />
        <LeftSideMenu />
        <Table />
      </div>
    );
  }
}

export default AdminPage;
