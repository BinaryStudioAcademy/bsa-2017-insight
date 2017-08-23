export const PATH_CHANGED = 'path_changed';

let instance = null;

const observers = {};

class Actions {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }
  add(actionName, observer, callback) {
    const arr = observers[actionName];
    if (!arr) {
      observers[actionName] = [];
    }
    observers[actionName].push({ observer, callback });
  }

  remove(actionName, observer) {
    let arr = observers[actionName];
    if (arr) {
      arr = arr.filter((e) => {
        return e.observer !== observer;
      });
      observers[actionName] = arr;
    }
  }

  trigger(actionName, data) {
    const arr = observers[actionName];
    if (arr) {
      arr.forEach((element) => {
        element.callback(data);
      });
    }
  }
}


export default Actions;