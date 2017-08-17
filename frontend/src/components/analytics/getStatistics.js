export function getStatisticById(id) {
  return fetch(`http://localhost:3000/api/statistics/by-user/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((statistic) => {
      return statistic;
    });
}
