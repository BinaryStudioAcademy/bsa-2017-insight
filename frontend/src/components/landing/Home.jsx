import React from 'react';
// import { Route, IndexRoute } from 'react-router';
import styles from './styles.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';

class Home extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Home;
