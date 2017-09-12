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

  api(message) {
    if (options.api && !document.hasFocus()) {
      const notificaitonText = `${message.author.item.username}: ${message.body}`;
      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          const notification = new Notification(notificaitonText);
          console.log(notification);
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission((permission) => {
            if (permission === 'granted') {
              const notification = new Notification(notificaitonText);
              console.log(notification);
            }
          });
        }
      }
    }
  },

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
