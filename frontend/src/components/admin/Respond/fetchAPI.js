export  function getConversations() {
  return fetch('http://localhost:3000/api/conversations')
  .then( response => {
    return response.json();
 })
  .then(conversation=>{
    return conversation;
  })
}

