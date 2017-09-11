export function getConversations() {
  return fetch(`${window._injectedData.insightHost}/api/conversations`, {
    credentials: 'include',
  })
    .then((response) => {
      return response.json();
    })
    .then((conversation) => {
      return conversation;
    });
}

export function getConversationById(id) {
  return fetch(`${window._injectedData.insightHost}/api/conversations/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((conversation) => {
      return conversation;
    });
}

export function getConversationsByFilters(filters) {
  console.log(window._injectedData);
  return fetch(`${window._injectedData.insightHost}/api/conversations/filter`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(filters),
  }).then(response => response.json()).then((conversations) => {
    return conversations;
  });
}
