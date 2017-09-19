export const create = (title, options) => {
  let notification;
  if (!('Notification' in window)) {
    return console.log('Notifications are not supported');
  } else if (Notification.permission === 'granted') {
    notification = new Notification(title, {
      body: options.body,
      icon: '/resources/insight.png',
    });
    notification.onclick = function() {
      options.handler();
      window.focus();
      this.close()
    }
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
      notification = new Notification(title, {
        body: options.body,
        icon: '/resources/insight.png',
      });
      notification.onclick = options.handler;
      }
      return permission;
    });
  }
  const audio = new Audio('/resources/notification.mp3');
  audio.play();
  return notification;
}

const notification = {
  create,
};

export default notification;