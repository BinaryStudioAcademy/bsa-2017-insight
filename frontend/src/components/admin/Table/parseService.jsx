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
      return <span title={name} style={style} />;
    }
    return name;
  },
  flag(flagname) {
    const imgName = flagname.toLowerCase();
    const flagImageStyle = Object.assign({}, imageStyles);
    flagImageStyle.width = '16px';
    flagImageStyle.height = '11px';
    flagImageStyle.backgroundImage = `url(${window._injectedData.insightHost}/resources/flags/${imgName}.png)`;
    return this.parse(flagImageStyle, imgName);
  },
  browser(browsername) {
    const imgName = browsername.toLowerCase();
    const browserImageStyle = Object.assign({}, imageStyles);
    browserImageStyle.width = '24px';
    browserImageStyle.height = '24px';
    browserImageStyle.backgroundImage = `url(${window._injectedData.insightHost}/resources/browsers/${imgName}.png)`;
    return this.parse(browserImageStyle, imgName);
  },
  os(osname) {
    const imgName = osname.toLowerCase().split(' ');
    const osImageStyle = Object.assign({}, imageStyles);
    osImageStyle.width = '24px';
    osImageStyle.height = '24px';

    switch (imgName[0]) {
      case 'windows':
        osImageStyle.backgroundImage = `url(${window._injectedData.insightHost}/resources/os/${imgName.join('-')}.png)`;
        return this.parse(osImageStyle, imgName.join('-'));
      case 'linux':
        osImageStyle.backgroundImage = `url(${window._injectedData.insightHost}/resources/os/linux.png)`;
        return this.parse(osImageStyle, 'linux');
      case 'ubuntu':
        osImageStyle.backgroundImage = `url(${window._injectedData.insightHost}/resources/os/ubuntu.png)`;
        return this.parse(osImageStyle, 'ubuntu');
      case 'debian':
        osImageStyle.backgroundImage = `url(${window._injectedData.insightHost}/resources/os/debian.png)`;
        return this.parse(osImageStyle, 'debian');
      case 'macos':
        osImageStyle.backgroundImage = `url(${window._injectedData.insightHost}/resources/os/mac-os.png)`;
        return this.parse(osImageStyle, 'mac-os');
      case 'os':
        osImageStyle.backgroundImage = `url(${window._injectedData.insightHost}/resources/os/mac-os.png)`;
        return this.parse(osImageStyle, 'mac-os');
      case 'ios':
        osImageStyle.backgroundImage = `url(${window._injectedData.insightHost}/resources/os/mac-os.png)`;
        return this.parse(osImageStyle, 'mac-os');
      case 'android':
        osImageStyle.backgroundImage = `url(${window._injectedData.insightHost}/resources/os/android.png)`;
        return this.parse(osImageStyle, 'android');
      default:
        return osname;
    }
  },
};

export default parseService;

