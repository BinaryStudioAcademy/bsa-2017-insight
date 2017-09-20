import React from 'react';
import styles from './styles.scss';

class Product extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.product}>
          <div>
            <img src="/resources/landing/images/respond1.jpg" alt="respond-1" />
            <img src="/resources/landing/images/respond2.jpg" alt="respond-2" />
            <img src="/resources/landing/images/respond3.jpg" alt="respond-3" />
            <img src="/resources/landing/images/respond4.jpg" alt="respond-4" />
          </div>
          <div className={styles.description}>
            <h2>Communicate with your customers!</h2>
            <p>Find a personal approach for each of your customers with InSight Respond.</p>
            <p>Either you have a small or huge business, either you are selling groceries online or having
 a software company, with Respond product you&#39;ll have a chance to easily communicate
 with your customers even if they are located on other side of our planet.</p>
            <p>Nothing can make your customers more appreciative than your personal
 attention in this huge, impersonal cyberspace.</p>
            <p>The &quot;old&quot; ways of communications, using expensive voice calls and even more stupid videochats
 are outmoded. Think about it: the modern world is filled with introverts and hikkies - no one want&#39;s to
 speak anymore! Moreover, &quot;voice calls&quot; even smell 1900s.</p>
            <p>Video calls are even weirder: who really wants to speak with you, sitting in their underwear inside of
 the apartment? Nah, this way of communication will never become popular.</p>
            <p>And this is why we suppose chats to be the BEST way of
 communacation between businesses and customers!</p>
            <p>Well, why should you choose InSight Respond as a chat for your site? Let&#39;s see...</p>
            <p>...</p>
            <p>...</p>
            <p>We have emojis - the greatest way to express your emotions or understand your customers feelings
 about using your products or services.</p>
            <p>You&#39;ll also have a possibility to analyze your user&#39;s info and activity on your
 site to give them better support - ever wanted to become a &quot;Big Brother&quot;?</p>
            <p>InSight Respond even have such features as: file exchanging, widget customisation, notifications,
 message forcing, and even more stuff to make you and your customers happy!</p>
            <p>So what are you waiting for? Try it out right now!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
