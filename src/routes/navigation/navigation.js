import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './navigation.scss';
import logo from '../../assets/logo.png';

const Navigation = () => {
	return (
		<>
			<div className="navigation">
				<Link className="logo-container" to="/">
					<img src={logo} alt="Logo" className="logo" />
				</Link>
				<div className="nav-links-container">
					<Link className="nav-link" to="/shop">
						SHOP
					</Link>
					<Link className="nav-link" to="/sign-in">
						SIGN IN
					</Link>
				</div>
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
