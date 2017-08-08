import React from 'react';
import styles from './styles.scss';

class Login extends React.Component {  
    render() {
        return (
        	<div>
        		<p>Sing into your account</p>
        		<p>Enter your email</p>
        		<input placeholder="Email" ref="theInput"></input>
        		<p>Enter your password</p>
        		<input placeholder="Password" ref="theInput"></input>
        	</div>
        )
    }
}

export default Login;