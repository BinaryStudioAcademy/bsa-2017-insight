// const settings = {
//   '/respond': { path: '/respond', time: 11000 },
//   '/engage': { path: '/engage', time: 11000 },
// };

const checkPath = (data, settings) => {
  const [callback, pathName] = data;
  settings.forEach((forceMessage, i) => {
    const path = pathName === settings[i].page ? settings[i].page : null;
    switch (pathName) {
      case path:
        console.log(`widget will open after ${settings[i].timer / 1000}sec`);
        return callback(settings[i].timer);
      default:
        console.log('not opening');
        return null;
    }
  });
};

export default checkPath;
