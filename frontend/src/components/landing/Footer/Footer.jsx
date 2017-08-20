import React from 'react';
import styles from './styles.scss';
import FooterColumn from './FooterColumn';

class Footer extends React.Component {
  render() {
    return (
      <div className={styles.footer}>
        <FooterColumn
          heading={'Products'}
          textItems={[{ name: 'Engage', link: '/engage' }, { name: 'Respond', link: '/respond' }]}
        />
        <FooterColumn
          heading={'Resources'}
          textItems={[
            { name: 'Customers', link: '/customers' },
            { name: 'Help center', link: '/help' }
          ]}
        />
        <FooterColumn
          textItems={[
            { name: 'About us', link: '/about' },
            { name: 'Pricing', link: '/pricing' }
          ]}
        />
        <FooterColumn
          imageItems={[
            { image: './resources/landing/images/icon_facebook.svg', link: '/' },
            { image: './resources/landing/images/icon_github.svg', link: '/' },
            { image: './resources/landing/images/icon_linkedin.svg', link: '/' }
          ]}
        />
      </div>
    );
  }
}

export default Footer;
