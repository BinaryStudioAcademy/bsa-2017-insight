import React from 'react';
import styles from './styles.scss';

class Pricing extends React.Component {
  render() {
    return (
      <div className={styles.pricing}>
        <div className={styles['higher-part']}>
          <div>
            <h1>It&#39;s free!</h1>
            <p>No, seriously! </p>
          </div>
          <img src={`${window._injectedData.insightHost}/resources/landing/images/pricing.jpg`} alt="product" />
        </div>
        <hr />
        <div className={styles['lower-part']}>
          <div className={styles['product-item']}>
            <h2>Respond</h2>
            <div className={styles['product-description']}>
              <p className={styles.price}>From $0.00/month</p>
              <p>Manage and reply to requests for help across live chat, email, and social, in one place.</p>
            </div>
            <button onClick={() => location.replace('/admin')}>Try it</button>
          </div>
          <div className={styles['product-item']}>
            <h2>Engage</h2>
            <div className={styles['product-description']}>
              <p className={styles.price}>From $0.00/month</p>
              <p>Send targeted emails, in-apps, push messages, and campaigns triggered by time or behavior.</p>
            </div>
            <button onClick={() => location.replace('/admin')}>Try it</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Pricing;
