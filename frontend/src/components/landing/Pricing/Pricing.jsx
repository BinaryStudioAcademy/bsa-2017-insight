import React from 'react';
import styles from './styles.scss';

class Pricing extends React.Component {
  render() {
    return (
      <div className={styles.pricing}>
        <div className={styles['higher-part']}>
          <div>
            <h1>Pay only for what you need</h1>
            <p>Start with one product or many. Try them free for 14 days and add more at any time.</p>
          </div>
          <img src="http://via.placeholder.com/400x400" alt="product" />
        </div>
        <hr />
        <div className={styles['lower-part']}>
          <div className={styles['product-item']}>
            <h2>Respond</h2>
            <div className={styles['product-description']}>
              <p className={styles.price}>From $53/month</p>
              <p>Manage and reply to requests for help across live chat, email, and social, in one place.</p>
            </div>
            <button>Try it</button>
          </div>
          <div className={styles['product-item']}>
            <h2>Engage</h2>
            <div className={styles['product-description']}>
              <p className={styles.price}>From $53/month</p>
              <p>Send targeted emails, in-apps, push messages, and campaigns triggered by time or behavior.</p>
            </div>
            <button>Try it</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Pricing;
