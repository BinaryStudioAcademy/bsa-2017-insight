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
            { name: 'Help center', link: '/help' },
          ]}
        />
        <FooterColumn
          textItems={[
            { name: 'Pricing', link: '/pricing' },
          ]}
        />
        <FooterColumn
          imageItems={[
            { image: './resources/landing/images/icon_facebook.svg', link: 'https://www.facebook.com/BinaryStudioAcademy/' },
            { image: './resources/landing/images/icon_github.svg', link: 'https://github.com/BinaryStudioAcademy/bsa-2017-insight/tree/dev' },
            { image: './resources/landing/images/icon_linkedin.svg', link: 'https://www.linkedin.com/company/241166/' },
          ]}
        />
      </div>
    );
  }
}

export default Footer;
