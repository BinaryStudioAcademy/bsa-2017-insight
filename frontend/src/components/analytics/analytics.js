(function () {
  const userStatistics = {
    visitorId: null,
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

  const registeredUser = localStorage.getItem('user'); // при логине, пусть компонент берет айди с локалстораджа
  // при регистрации,создается не только объект юзера, но также и объект статистики этого юзера, обязательно с
  // указанным айди!!!!!!!!!!!!!!!!!!!!!!!!1111111111111111111111111111один
  const globalId = localStorage.getItem('globalId');

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
      method, // вообще это всегда PUT, просто пут нужно настраивать различать id, сейчас нет времени
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
      method: 'POST', // вообще это всегда PUT, просто пут нужно настраивать различать id, сейчас нет времени
    };
    return fetch('http://localhost:3000/api/visitors', requestOptions);
  }

  function saveUrlHistory() {
    const lastUrl = localStorage.getItem('lastUrl');
    if (!lastUrl) {
      localStorage.setItem('lastUrl', location.href);
    } else if (lastUrl === location.href) {
      return;
    } else {
      localStorage.setItem('lastUrl', location.href);
    }
    const oldHistory = JSON.parse(localStorage.getItem('urlHistory'));
    let newHistory = [location.href];
    if (oldHistory) {
      newHistory = [...oldHistory, location.href];
    }
    userStatistics.viewedUrls = newHistory;
    localStorage.setItem('urlHistory', JSON.stringify(newHistory));
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

  if (registeredUser && registeredUser.id) {
    userStatistics.visitorId = registeredUser.id;
    collectAllData().then(() => sendStatistics(registeredUser.id, 'PUT'));
  } else if (globalId) {
    userStatistics.visitorId = globalId;
    collectAllData().then(() => sendStatistics(globalId, 'PUT'));
    // на сервере проверять не _id, а visitorId
  } else {
    const newGlobalId = generateId();
    userStatistics.visitorId = newGlobalId;
    localStorage.setItem('globalId', newGlobalId);
    collectAllData().then(() => {
      sendUser(newGlobalId)
        .then(response => response.json())
        .then(() => {
          sendStatistics(null, 'POST');
        });
    });
  }
}());
