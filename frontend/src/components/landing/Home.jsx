import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import styles from './styles.scss';
import Header from './Header/Header';
import HomeContent from './HomeContent/HomeContent';
import Footer from './Footer/Footer';

WebFont.load({
  google: {
    families: ['Ubuntu:300,400,700']
  }
});

class Home extends React.Component {
  render() {
    return (
      <div className={styles['container']}>
        <Header />
        <Switch>
          <Route exact path='/' component={HomeContent} />
          <Route path='/engage' component={HomeContent}/>
          <Route path='/respond' component={HomeContent}/>
          <Route path='/customers' component={HomeContent}/>
          <Route path='/help' component={HomeContent}/>
          <Route path='/about' component={HomeContent}/>
          <Route path='/pricing' component={HomeContent}/>
          <Route path='/login' component={HomeContent}/>
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default Home;