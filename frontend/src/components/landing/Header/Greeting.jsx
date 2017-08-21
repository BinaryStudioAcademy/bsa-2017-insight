import React from 'react';
import { NavLink } from 'react-router-dom';

class Greeting extends React.Component {

	logout(e) {
		e.preventDefault();
		fetch('/api/user/logout', { credentials: 'include' })
			.then((response) => window.location.replace(response.url));
	}

	render() {
		return (
			<div>
				<span>Hi, {this.props.name} | </span>
				<NavLink to={'/logout'} onClick={this.logout}>Log out</NavLink>
			</div>
		)
	}
}

export  default Greeting;