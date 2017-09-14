import React from 'react';
import styles from './styles.scss';
import TopMenuItem from './TopMenuItem';
import Greeting from './Greeting';

class TopMenu extends React.Component {
  render() {
    const user = window._injectedData.userId;
    const greeting = (user && !user.isAdmin) ? <Greeting name={user.firstName} /> : null;

    return (
      <ul className={styles['top-menu']}>
        <TopMenuItem
          name={'Products'}
          link={'#'}
          submenu={[
            { name: 'Engage', link: '/engage' },
            { name: 'Respond', link: '/respond' },
          ]}
        />
        <TopMenuItem
          name={'Resources'}
          link={'#'}
          submenu={[
            { name: 'Customers', link: '/customers' },
            { name: 'Help center', link: '/help' },
          ]}
        />
        <TopMenuItem name={'Pricing'} link={'/pricing'} />
        {greeting || <TopMenuItem name={'Log in'} link={'/login'} />}
      </ul>
    );
  }
}

export default TopMenu;
