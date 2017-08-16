export function fetchStatistic() {
  console.log('fetch statistic function');
  const url = 'http://localhost:3000/api/statistics';
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
    method: 'GET',
  };
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      // console.log(typeof(info[0]));
      // console.log(info[0]);
      return info;
    });
}
