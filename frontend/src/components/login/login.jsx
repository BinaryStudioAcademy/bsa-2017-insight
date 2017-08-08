import React from 'react';
import styles from './styles.scss';

class Login extends React.Component { 
	constructor(){
        super();
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    handleLogIn(event){
    	console.log("Button was clicked");
    }

    render() {
        return (
        	<div>
        		<p>Sing into your account</p>
        		<p>Enter your email</p>
        		<input placeholder="Email" ref="theInput"/>
        		<p>Enter your password</p>
        		<input placeholder="Password" ref="theInput"/><br/>
        		<input type="checkbox" id="rememberMe"/>
        		<label htmlFor="rememberMe">Remember me</label><br/>
        		<button onClick={this.handleLogIn}>Remove User</button>
        	</div>
        )
    }
}

export default Login;