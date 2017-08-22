const options = {
  email: true,
  api: true,
  title: true,
  emailTimeout: 30 // seconds
};

const notifications = {

  email(message) {
    console.log('email notification');
    fetch('/api/notification/email', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(message)
    }).catch((err) => {
      console.log(`We've got a problem: ${err}`);
    });
  },

  api() {
    console.log('api notificaiton');
  },

  title() {
    console.log('title notification');
  }

};

function notify(message) {
  console.log('Notifying...');
  if (options.email) {
    notifications.email(message);
  }
  if (options.api) {
    notifications.api(message);
  }
  if (options.title) {
    notifications.title();
  }
}

export default notify;
