const settings = {
  '/respond': { path: '/respond', time: 25000 },
  '/engage': { path: '/engage', time: 11000 }
};

const checkPath = (data) => {
  const [callback, pathName] = data;
  const path = settings[pathName] ? settings[pathName].path : null;
  switch (pathName) {
    case path:
      console.log(`widget will open after ${settings[pathName].time / 1000}sec`);
      return callback(settings[pathName].time);
    default:
      console.log('widget will open after 5sec');
      return callback(5000);
  }
};

export default checkPath;