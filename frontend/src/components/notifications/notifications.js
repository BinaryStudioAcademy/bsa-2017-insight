const options = {
  email: true,
  api: true,
  title: true,
};

const notifications = {

  email(message) {
    if (options.email) {
      fetch('/api/notification/email', {
        headers: {
          'Content-Type': 'application/json'
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
          let notification = new Notification(notificaitonText);
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission((permission) => {
            if (permission === 'granted') {
              let notification = new Notification(notificaitonText);
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
  }

};

export default notifications;
