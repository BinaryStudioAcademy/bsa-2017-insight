function getStatistics() {
  const url = 'http://localhost:3000/api/statistics';
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
    method: 'GET',
  };
  fetch(url, requestOptions)
    .then(function(response) {
      return response.json();
   })
    .then(function(user) {
    console.log(user[0]);
  })
    .catch( alert );
};

getStatistics();


