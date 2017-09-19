import React from 'react';
import map from './map.json';

const imageStyles = {
  display: 'inline-block',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};

const parseService = {
  parse(style, name) {
    if (map[name]) {
      return <span style={style} />;
    }
    return name;
  },
  flag(flagname) {
    const imgName = flagname.toLowerCase();
    const flagImageStyle = Object.assign({}, imageStyles);
    flagImageStyle.width = '16px';
    flagImageStyle.height = '11px';
    flagImageStyle.backgroundImage = `url(./uploads/flags/${imgName}.png)`;
    return this.parse(flagImageStyle, imgName);
  },
  browser(browsername) {
    const imgName = browsername.toLowerCase();
    const browserImageStyle = Object.assign({}, imageStyles);
    browserImageStyle.width = '24px';
    browserImageStyle.height = '24px';
    browserImageStyle.backgroundImage = `url(./uploads/browsers/${imgName}.png)`;
    return this.parse(browserImageStyle, imgName);
  },
  os(osname) {
    const imgName = osname.toLowerCase().split(' ').join('-');
    const osImageStyle = Object.assign({}, imageStyles);
    osImageStyle.width = '24px';
    osImageStyle.height = '24px';
    osImageStyle.backgroundImage = `url(./uploads/os/${imgName}.png)`;
    return this.parse(osImageStyle, imgName);
  },
};

export default parseService;

