import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.scss';

class HomeContent extends React.Component {
  render() {
    return (
      <div className={styles['home-content']}>
        <Slogan />
        <HomeContentImg />
        <div className={styles['home-content-products']}>
          <HomeContentProduct
            name={'Respond'}
            description={'Manage and reply to requests from your customers all over the world'}
            link={'/'}
            image={'./resources/landing/images/chat_pic.png'}
          />
          <HomeContentProduct
            name={'Engage'}
            description={'Analyze your audience and then send them offers they can’t refuse!'}
            link={'/'}
            image={'./resources/landing/images/engage_pic.png'}
          />
        </div>
      </div>
    );
  }
}

class Slogan extends React.Component {
  render() {
    return (
      <h2 className={styles['slogan']}>
        We are here
        <br />to <span>help you
        <br />stay in touch</span>
        <br />with your customers
      </h2>
    );
  }
}

class HomeContentImg extends React.Component {
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

class HomeContentProduct extends React.Component {
  render() {
    return (
      <div className={styles['home-content-product']}>
        <img src={this.props.image} alt={''} />
        <h3>{this.props.name}</h3>
        <span>{this.props.description}</span>
        <NavLink to={this.props.link}>Learn more...</NavLink>
      </div>
    );
  }
}

export default HomeContent;
