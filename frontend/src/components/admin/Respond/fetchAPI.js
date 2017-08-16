export  function getConversations(){

 return fetch("http://localhost:3000/api/conversations")
 .then(response=>{
   return response.json()
 })
  .then(conversation=>{
    return conversation
  })
}

export function getStatisticById(id){
  return fetch("http://localhost:3000/api/statistics/"+id)
 .then(response=>{
   return response.json()
 })
  .then(statistic=>{
    return statistic
  })
}