function getStatisticById(id) {
  return fetch(`http://localhost:3000/api/statistics/by-user/${id}`)
    .then(response => response.json())
    .then(statistic => statistic);
}

export { getStatisticById };

