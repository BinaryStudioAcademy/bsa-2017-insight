const globalId = localStorage.getItem('globalId');
let geolocationWatcherId;

const userStatistic = {
  // globalId,
  name: null,
  email: null,
  online: navigator.onLine, // не уверен что нужно
  avatar: null,
  statistics: {
    viewedUrls: JSON.parse(localStorage.getItem('urlHistory')),
    currentUrl: location.href,
    browserLanguage: navigator.language,
    geoLocation: null,
    // country: определять по координатам или по ip? не знаю как лушче, но кажется это стоит делать на стороне сервера
    // city: та же история
    screenInfo: screen,
    // эту строку на сервере распарсить и получить и браузер, и версию браузера, и ОС; или лучше парсить тут? но тогда
    // нужна мини-библиотечка с регекспами походу
    userAgent: navigator.userAgent,
    timeZone: -((new Date()).getTimezoneOffset() / 60),
    ipInfo: null, // тут сразу город, страна, ip, координаты, регион; КОНФЛИКТУЕТ С GEOLOCATION - что выбирать?
  },
};

function fillUserInfo() {
  if (globalId) {
    userStatistic.name = localStorage.getItem('name');
    userStatistic.email = localStorage.getItem('email');
    userStatistic.avatar = localStorage.getItem('avatar');
  }
}

function getGeolocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userStatistic.statistics.geoLocation = position;
      },
      (err) => {
        console.log(err);
        userStatistic.statistics.geoLocation = null;
      },
      { enableHighAccuracy: true },
    );
    geolocationWatcherId = navigator.geolocation.watchPosition(
      (position) => {
        userStatistic.statistics.geoLocation = position;
        // call put method to send data to the server
      },
      (err) => {
        console.log(err);
        userStatistic.statistics.geoLocation = null;
      },
      { enableHighAccuracy: true });
  } else {
    console.log('geolocation is not available');
    userStatistic.statistics.geoLocation = null;
  }
}

function getUserIp() {
  fetch('https://ipinfo.io/json')
    .then(response => response.json()
      .then((data) => {
        userStatistic.statistics.ipInfo = data;
      }));
}

function sendData() {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userStatistic),
    method: 'POST', // вообще это всегда PUT, просто пут нужно настраивать различать id, сейчас нет времени
  };
  fetch('http://localhost:3000/api/visitors', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
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
  localStorage.setItem('urlHistory', JSON.stringify(newHistory));
}

window.onload = () => {
  // это по идее работать не будет, ведь скрипт обновляется после каждого перехода на новый юрл?
  // userStatistic.viewedUrls.push(location.href);
  userStatistic.statistics.currentUrl = location.href;
  fillUserInfo();
  getUserIp();
  getGeolocation();
  saveUrlHistory();
  sendData();
};

window.onclick = () => {
  sendData();
};

