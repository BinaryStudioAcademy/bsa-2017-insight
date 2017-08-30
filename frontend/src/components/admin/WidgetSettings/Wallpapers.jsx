import React from 'react';
import propTypes from 'prop-types';

export default class Wallpapers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active,
    };
    this.changeBackground = this.changeBackground.bind(this);
  }

  componentDidMount() {
    document.getElementById(this.state.active).style.border = '2px solid #000';
  }

  changeBackground(e) {
    if (e.target.id === this.state.active) return;
    document.getElementById(this.state.active).style.border = '1px solid #c9d7df';
    e.target.style.border = '2px solid #000';
    this.setState({ active: e.target.id });
    this.props.set('backgroundImage', e.target.id);
  }

  render() {
    return (
      <div className={'wallpapers'}>
        <h5>Choose background image</h5>
        <div
          className={'wallpaper'}
          id={'w1'}
          onClick={this.changeBackground}
          style={{ backgroundColor: '#fff' }}
        />
        <div
          className={'wallpaper'}
          id={'w2'}
          onClick={this.changeBackground}
          style={{ backgroundImage: 'url(/resources//wallpapers/w2.png)' }}
        />
        <div
          className={'wallpaper'}
          id={'w3'}
          onClick={this.changeBackground}
          style={{ backgroundImage: 'url(/resources//wallpapers/w3.png)' }}
        />
        <div
          className={'wallpaper'}
          id={'w4'}
          onClick={this.changeBackground}
          style={{ backgroundImage: 'url(/resources//wallpapers/w4.png)' }}
        />
        <div
          className={'wallpaper'}
          id={'w5'}
          onClick={this.changeBackground}
          style={{ backgroundImage: 'url(/resources//wallpapers/w5.png)' }}
        />
      </div>
    );
  }
}

Wallpapers.propTypes = {
  active: propTypes.string,
  set: propTypes.func,
};
