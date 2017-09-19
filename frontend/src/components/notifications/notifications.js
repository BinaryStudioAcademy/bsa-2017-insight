const options = {
  email: false,
  api: true,
  title: true,
};

const notifications = {
  email(message) {
    if (options.email) {
      fetch(`${window._injectedData.insightHost}/api/notification/email`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(message),
      }).catch((err) => {
        console.log(`Houston, we've got a problem: ${err}`);
      });
    }
  },

  api(type, message, handler) {
    let notification;
    let notificationText;
    if (options.api && !document.hasFocus()) {
      // Forming text
      if (type === 'new message') {
        notificationText = `${message.author.item.username}: ${message.body}`;
      } else if (type === 'unpicked conversation') {
        notificationText = 'New unpicked conversation. Click to open';
      } else if (type === 'reassigned conversation') {
        notificationText = 'You have been assigned a new conversation. Click to open';
      }
      // Sending a notification if we can
      if (!('Notification' in window)) {
        return console.log('Notifications are not supported');
      } else if (Notification.permission === 'granted') {
        notification = new Notification(notificationText);
        if (handler) notification.onclick = handler;
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission((permission) => {
          if (permission === 'granted') {
            notification = new Notification(notificationText);
            if (handler) notification.onclick = handler;
          }
        });
      }
    }
    return notification;
  },
  // if (!('Notification' in window)) {
  //   return console.log('Notifications are not supported');
  // } else if (Notification.permission === 'granted') {
  //   notification = new Notification('New unpicked conversation. Click to open');
  //   notification.onclick = handler;
  // } else if (Notification.permission !== 'denied') {
  //   Notification.requestPermission((permission) => {
  //     if (permission === 'granted') {
  //       notification = new Notification('New unpicked conversation. Click to open');
  //       notification.onclick = handler;
  //     }
  //     return permission;
  //   });
  // }
  // return notification;

  title() {
    const initialTitle = document.title;
    const blinkingTitle = setInterval(() => {
      if (options.title && !document.hasFocus()) {
        if (document.title === initialTitle) {
          document.title += ': new message/s';
        } else {
          document.title = initialTitle;
        }
      } else {
        document.title = initialTitle;
        clearInterval(blinkingTitle);
      }
    }, 1500);
  },
};

export default notifications;
