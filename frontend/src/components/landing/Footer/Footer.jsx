import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.scss';

class Footer extends React.Component {
  render() {
    return (
      <div className={styles['footer']}>
        <FooterColumn
          heading={'Products'}
          textItems={[{ name: 'Engage', link: '/engage' }, { name: 'Respond', link: '/respond' }]}
        />
        <FooterColumn
          heading={'Resources'}
          textItems={[
            { name: 'Customers', link: '/customers' },
            { name: 'Help center', link: '/help' },
          ]}
        />
        <FooterColumn
          textItems={[
            { name: 'About us', link: '/about' },
            { name: 'Pricing', link: '/pricing' },
          ]}
        />
        <FooterColumn
          imageItems={[
            { image: './resources/landing/images/icon_facebook.svg', link: '/' },
            { image: './resources/landing/images/icon_github.svg', link: '/' },
            { image: './resources/landing/images/icon_linkedin.svg', link: '/' },
          ]}
        />
      </div>
    );
  }
}

class FooterColumn extends React.Component {
  render() {
    if (this.props.textItems) {
      this.items = this.props.textItems.map((item, i) => {
        return (<li key={i}><NavLink to={item.link}>{item.name}</NavLink></li>);
      });
    } else if (this.props.imageItems) {
      this.items = this.props.imageItems.map((item, i) => {
        return (<li key={i} className={styles['picture-list']}>
          <a href={item.link}>
            <img src={item.image} alt={''} />
          </a>
        </li>);
      });
    } else {
      this.items = '';
    }
    return (
      <div className={styles['footer-column']}>
        <h3>{this.props.heading}</h3>
        <ul>
          {this.items}
        </ul>
      </div>
    );
  }
}

export default Footer;
