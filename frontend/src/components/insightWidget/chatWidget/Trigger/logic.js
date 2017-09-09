// const settings = {
//   '/respond': { path: '/respond', time: 11000 },
//   '/engage': { path: '/engage', time: 11000 },
// };

function intersection(targetArr, arr2) {
  return arr2.some((v) => {
    return targetArr.indexOf(v) >= 0;
  });
}

const checkPath = (data, settings) => {
  const [callback, pathName] = data;
  settings.forEach((forceMessage, i) => {
    const path = pathName === settings[i].page ? settings[i].page : null;
    switch (pathName) {
      case path:
        if (intersection(window._injectedData.urlHistory, settings[i].conditions.visitedURLS)) {
          return callback(settings[i].timer, settings[i].body);
        }
        return null;
      default:
        return null;
    }
  });
};

export default checkPath;
