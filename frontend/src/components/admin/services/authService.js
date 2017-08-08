class AuthService{
  logIn(){
    return fetch('./test.json', { method: 'get' })
      .then((response) =>{
         return response.json().catch((ex) => {
      console.log('parsing failed', ex);
    })
  })}
  logOut(){}
  changePassword(){}
}

const authService = new AuthService();

export default authService;