const registeredUserId = localStorage.getItem('user').id;
const statisticId = localStorage.getItem('user').statisticId;
const globalId = localStorage.getItem('globalId');

if (registeredUserId) {
  userStatistic.visitorId = registeredUserId;
} else if (globalId) {
  userStatistic.visitorId = globalId;
  // send put userStatistic object
  // на сервере проверять не _id, а visitorId
} else {
  const newGlobalId = setId();
  serStatistic.visitorId = newGlobalId;
  localStorage.set
  // sending post userStatistic object
}

let geolocationWatcherId;

const userStatistic = {
  visitorId: globalId, // or registeredId
  viewedUrls: JSON.parse(localStorage.getItem('urlHistory')),
  currentUrl: location.href,
  browserLanguage: navigator.language,
  geoLocation: null,
  online: navigator.onLine,
  // country: определять по координатам или по ip? не знаю как лушче, но кажется это стоит делать на стороне сервера
  // city: та же история
  screenInfo: screen,
  // эту строку на сервере распарсить и получить и браузер, и версию браузера, и ОС; или лучше парсить тут? но тогда
  // нужна мини-библиотечка с регекспами походу
  userAgent: navigator.userAgent,
  timeZone: -((new Date()).getTimezoneOffset() / 60),
  ipInfo: null, // тут сразу город, страна, ip, координаты, регион; КОНФЛИКТУЕТ С GEOLOCATION - что выбирать?
  // city: брать из IpInfo
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

function getUserIp(id) {
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
  fetch('http://localhost:3000/api/statistics', requestOptions)
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
  saveUrlHistory();
  sendData();
};

window.onclick = () => {
  sendData();
};

