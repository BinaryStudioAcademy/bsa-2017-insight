export  function getConversations(){
  let result = null
  console.log("HELLO FROM API")
  var xhr = new XMLHttpRequest()
  
  xhr.open("GET","http://localhost:3000/api/converstions",true)
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function(){
    if (xhr.status === 200){
       result = xhr.responseText
    }
  }
  xhr.send()
  return result
}