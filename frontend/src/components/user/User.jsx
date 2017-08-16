import React from 'react';
import { Switch, Route } from 'react-router';
import UserLogin from './UserLogin';
import UserRegistration from './UserRegistration';

class User extends React.Component {
	render() {
		return (
			<Switch>
				<Route path='/user/login' component={UserLogin} />
				<Route path='/user/registration' component={UserRegistration} />
			</Switch>
		);
	}
}

export default User;
