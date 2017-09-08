function getStatisticsByQuery(query) {
  let url = 'http://localhost:3000/api/statistics';
  if (query && query !== '') url = `http://localhost:3000/api/users?${query}`;
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
    method: 'GET',
    credentials: 'include',
  };
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((info) => {
      return info;
    });
}

function getStatisticById(id) {
  return fetch(`http://localhost:3000/api/statistics/by-user/${id}`)
    .then(response => response.json())
    .then(statistic => statistic);
}

export { getStatisticById, getStatisticsByQuery };
