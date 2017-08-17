function fetchStatistic() {
  const url = 'http://localhost:3000/api/statistics';
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
    method: 'GET',
  };
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      return info;
    });
}

function fetchStatisticById(id) {
  return fetch(`http://localhost:3000/api/statistics/by-user/${id}`)
    .then(response => response.json())
    .then(statistic => statistic);
}

export { fetchStatisticById, fetchStatistic };
