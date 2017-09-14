function getStatisticsByQuery(query) {
  let url = `${window._injectedData.insightHost}/api/statistics`;
  if (query && query !== '') url = `${window._injectedData.insightHost}/api/users?${query}`;
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
      if (response.status === 200) return response.json();
      return undefined;
    })
    .then((info) => {
      return info;
    })
    .catch(err => console.log(err));
}

function getStatisticById(id) {
  return fetch(`${window._injectedData.insightHost}/api/statistics/by-user/${id}`)
    .then(response => response.json())
    .then(statistic => statistic);
}

export { getStatisticById, getStatisticsByQuery };
