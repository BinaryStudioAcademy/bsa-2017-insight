let AuthService = {
    login: function (email, password) {

        dataHelper.fetchPost('session', {email: email, password: password})
            .then(resp => {
                let {token,expires,user} = resp;
                LoginActions.loginUser(token, expires,user);
                console.log(token);
            })
            .catch(err => {
                console.log(`Fetch post failed with error: ${err}`);
            });
    }
};

const authService = new AuthService();

export default authService;