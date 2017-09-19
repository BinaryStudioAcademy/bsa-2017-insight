function getFAQ() {
  const url = `${window._injectedData.insightHost}/api/faq`;
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
    .then((data) => {
      return data;
    });
}

function getFAQById(id) {
  const url = `${window._injectedData.insightHost}/api/faq/${id}`;
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
    .then((data) => {
      return data;
    });
}

function addFAQ(Body) {
  const url = `${window._injectedData.insightHost}/api/faq`;
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.assign(Body, { appId: window._injectedData.appId })),
    method: 'POST',
  };
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
}

function modifyFAQ(id, Body) {
  const url = `${window._injectedData.insightHost}/api/faq/${id}`;
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    path: `${window._injectedData.insightHost}/api/faq/${id}`,
    body: JSON.stringify(Body),
    method: 'PUT',
  };
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    });
}

function deleteFAQ(id) {
  const url = `${window._injectedData.insightHost}/api/faq/${id}`;
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json'.anchor,
    },
    body: null,
    method: 'DELETE',
  };
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    });
}

export { getFAQ, addFAQ, deleteFAQ, getFAQById, modifyFAQ };
