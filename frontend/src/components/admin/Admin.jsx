import React from 'react';
import { Switch, Route } from 'react-router';
import AdminLogin from './AdminLogin';
import AdminRegistration from './AdminRegistration';

class Admin extends React.Component {
	render() {
		return (
			<Switch>
				<Route path='/admin/login' component={AdminLogin} />
				<Route path='/admin/registration' component={AdminRegistration} />
			</Switch>
		);
	}
}

export default Admin;
