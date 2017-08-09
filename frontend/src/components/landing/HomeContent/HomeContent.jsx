import React from 'react';
import styles from './styles.scss';
import Slogan from './Slogan';
import HomeContentProduct from './HomeContentProduct';
import HomeContentImage from './HomeContentImage';

class HomeContent extends React.Component {
  render() {
    return (
      <div className={styles['home-content']}>
        <Slogan />
        <HomeContentImage />
        <div className={styles['home-content-products']}>
          <HomeContentProduct
            name={'Respond'}
            description={'Manage and reply to requests from your customers all over the world'}
            link={'/respond'}
            image={'./resources/landing/images/chat_pic.png'}
          />
          <HomeContentProduct
            name={'Engage'}
            description={'Analyze your audience and then send them offers they can’t refuse!'}
            link={'/engage'}
            image={'./resources/landing/images/engage_pic.png'}
          />
        </div>
      </div>
    );
  }
}

export default HomeContent;
