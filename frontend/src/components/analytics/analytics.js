(function () {
 const userStatistics = {
    userId: null,
    viewedUrls: null,
    currentUrl: location.href,
    browserLanguage: navigator.language,
    geoLocation: null,
    online: navigator.onLine,
    coordinates: null,
    userIpAddress: null,
    country: null,
    city: null,
    screenWidth: screen.width,
    screenHeight: screen.height,
    userAgent: navigator.userAgent,
    timeZone: -((new Date()).getTimezoneOffset() / 60),
  };

  function getUserIp() {
    return fetch('https://ipinfo.io/json');
  }

  function sendStatistics(id, method) {
    let url;
    if (method === 'POST') {
      url = 'http://localhost:3000/api/statistics';
    } else {
      url = `http://localhost:3000/api/statistics/${id}`;
    }
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userStatistics),
      method,
    };
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  function sendUser(id) {
    const userObject = {
      _id: id,
    };
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObject),
      method: 'POST',
    };
    return fetch('http://localhost:3000/api/users', requestOptions);
  }

  function saveUrlHistory() {
    const lastUrl = window._injectedData.lastUrl || window._injectedData.currentUrl;
    if (!lastUrl) {
      window._injectedData.lastUrl = location.href;
    } else if (lastUrl === location.href) {
      userStatistics.viewedUrls = window._injectedData.urlHistory || window._injectedData.viewedUrls;
      return;
    } else {
      window._injectedData.lastUrl = location.href;
    }
    const oldHistory = window._injectedData.urlHistory || window._injectedData.viewedUrls;
    let newHistory = [location.href];
    if (oldHistory) {
      newHistory = [...oldHistory, location.href];
    }
    userStatistics.viewedUrls = newHistory;
    window._injectedData.urlHistory = newHistory;
  }

  function collectAllData() {
    userStatistics.currentUrl = location.href;
    return getUserIp()
      .then(response => response.json())
      .then((data) => {
        userStatistics.userIpAddress = data.ip;
        userStatistics.city = data.city;
        userStatistics.country = data.country;
        userStatistics.coordinates = data.loc;
      })
      .then(() => {
        saveUrlHistory();
      });
  }

  function generateId() {
    return (Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)).slice(0, 24);
  }

  window.addEventListener('click', () => {
    const injectedData = window._injectedData;
    if (injectedData.isAdmin) return;
    const registeredUserId = injectedData.userId && injectedData.userId._id;
    const anonymousUserId = injectedData.anonymousId;
    if (registeredUserId) {
      userStatistics.userId = registeredUserId;
      collectAllData().then(() => sendStatistics(registeredUserId, 'PUT'));
    } else if (anonymousUserId) {
      userStatistics.userId = anonymousUserId;
      collectAllData().then(() => sendStatistics(anonymousUserId, 'PUT'));
    } else {
      const newAnonymousId = generateId();
      userStatistics.userId = newAnonymousId;
      injectedData.anonymousId = newAnonymousId;
      collectAllData().then(() => {
        sendUser(newAnonymousId)
          .then(response => response.json())
          .then(() => {
            sendStatistics(null, 'POST');
          });
      });
    }
  });
}());
