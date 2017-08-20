import React from 'react';
import styles from './styles.scss';
import TopMenuItem from './TopMenuItem';

class TopMenu extends React.Component {
  render() {
    return (
      <ul className={styles['top-menu']}>
        <TopMenuItem
          name={'Products'}
          link={'#'}
          submenu={[
            { name: 'Engage', link: '/engage' },
            { name: 'Respond', link: '/respond' }
          ]}
        />
        <TopMenuItem
          name={'Resources'}
          link={'#'}
          submenu={[
            { name: 'Customers', link: '/customers' },
            { name: 'Help center', link: '/help' }
          ]}
        />
        <TopMenuItem name={'Pricing'} link={'/pricing'} />
        <TopMenuItem name={'Log in'} link={'/login'} />
      </ul>
    );
  }
}

export default TopMenu;
