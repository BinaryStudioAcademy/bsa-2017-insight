import React from 'react';
import styles from './styles.scss';

class Product extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.product}>
          <div>
            <img src="/resources/landing/images/engage1.jpg" alt="engage-1" />
            <img src="/resources/landing/images/engage2.jpg" alt="engage-2" />
            <img src="/resources/landing/images/engage3.jpg" alt="engage-3" />
          </div>
          <div className={styles.description}>
            <h2>Stay in touch with your customers!</h2>
            <p>In this chaotic modern life it&#39;s too hard to not forget even about the most important things,
 like eating, drinking, bathing (eek), and so on... so how can you be sure that your customers won&#39;t
 forget about you?</p>
            <p>Don&#39;t get us wrong: YOU ARE GREAT, as well as your business  (especially if you are using
 our products), but some of your customers can forget about you, so it would be great to have some way to
 remind them about your business. And we have such way to propose you.</p>
            <p>Insight Engage is a tool to apply email marketing to your business. You&#39;ll be able to create
 wonderful mailings, based on your customer&#39;s info: language, location, device, engagement with your site etc.</p>
            <p>Use the collected data in your messages to give your users a feeling of personal approach.</p>
            <p>Analyze your users, create selections based on their statistics, and remind them by targeted emails.</p>
            <p>Try it right now!</p>
            <p>P.S. &quot;Email marketing&quot; is not a euphemism for SPAM.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
