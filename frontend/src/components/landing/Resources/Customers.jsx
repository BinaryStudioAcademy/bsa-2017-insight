import React from 'react';

class Customers extends React.Component {
  render() {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>Our Customers</h2>
        <p>We are our best and only customers so far... but maybe you can change it?</p>
        <img
          src={'https://scontent.flwo1-1.fna.fbcdn.net/v/t31.0-8/19800705_312114989246261_3595333123943198512_o.jpg?oh=406ae2f71e8ad236fa8e70da78044978&oe=5A5DFC55'}
          alt="here we are"
          style={{ transform: 'rotate(2deg)', boxShadow: '0 2px 15px #aaa', width: '50%', margin: '20px 0 40px' }}
        />
      </div>
    );
  }
}

export default Customers;
