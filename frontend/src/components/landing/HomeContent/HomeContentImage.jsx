import React from 'react';
import styles from './styles.scss';

class HomeContentImage extends React.Component {
  render() {
    return (
      <img
        src={'./resources/landing/images/home_content_image.jpg'}
        className={styles['home-content-image']}
        alt={''}
      />
    );
  }
}

export default HomeContentImage;
