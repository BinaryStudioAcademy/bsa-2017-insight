const userStatistic = {
  visitorId: null, // or registeredId
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

const registeredUserId = localStorage.getItem('user').id;  // при логине, пусть компонент берет айди с локалстораджа
// при регистрации,создается не только объект юзера, но также и объект статистики этого юзера, обязательно с
// указанным айди!!!!!!!!!!!!!!!!!!!!!!!!1111111111111111111111111111один
const statisticId = localStorage.getItem('user').statisticId; // не понятно зачем нужна переменная
const globalId = localStorage.getItem('globalId');

let geolocationWatcherId;

if (registeredUserId) {
  userStatistic.visitorId = registeredUserId;
  collectAllData();
  sendStatistics(registeredUserId, 'PUT');
} else if (globalId) {
  userStatistic.visitorId = globalId;
  collectAllData();
  sendStatistics(globalId, 'PUT');
  // на сервере проверять не _id, а visitorId
} else {
  const newGlobalId = setId(); // функция которая херачит айди
  userStatistic.visitorId = newGlobalId;
  localStorage.setItem('globalId', newGlobalId);
  collectAllData();
  sendUser(newGlobalId);
  sendStatistics(null, 'POST');
}

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
    body: JSON.stringify(userStatistic),
    method, // вообще это всегда PUT, просто пут нужно настраивать различать id, сейчас нет времени
  };
  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
}

function sendUser(id) {
  const userObject = {
    globalId: id,
  };
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObject),
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

function collectAllData() {
  userStatistic.currentUrl = location.href;
  fillUserInfo();
  getUserIp();
  saveUrlHistory();
  sendData();
}

// window.onload = () => {
//   // это по идее работать не будет, ведь скрипт обновляется после каждого перехода на новый юрл?
//   // userStatistic.viewedUrls.push(location.href);
//   collectAllData();
// };

window.onclick = () => {
  sendData();
};

