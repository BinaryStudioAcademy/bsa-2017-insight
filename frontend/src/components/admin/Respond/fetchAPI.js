export function getConversations() {
  return fetch('http://localhost:3000/api/conversations', {
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
  return fetch(`http://localhost:3000/api/conversations/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((conversation) => {
      return conversation;
    });
}
