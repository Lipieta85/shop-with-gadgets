import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../authentication/Auth";
import "../assets/styles/login-form.scss"
import imageGallery from '../assets/images/intro_1.jpg'
import Carousel from './Carousel';

const LoginForm = () => {
	const [data, userData] = useState({
		"users": [
			{
				"id": 1,
				"userName": "admin",
				"password": "admin"
			},
			{
				"id": 2,
				"userName": "klient",
				"password": "klient"
			}
		]
	});
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isError, setIsError] = useState(false);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const { setAuthTokens } = useAuth();

	function postLogin() {
		//const data = [userName, password]
		data.users.map(user => {
			console.log(user)
			if (user.userName === userName && user.password === password) {
				setAuthTokens([userName, password]);
				setLoggedIn(true);
			}
			else {
				setIsError(true);
			}

		})
	}

	if (isLoggedIn && userName === "admin") {
		return <Redirect to="/admin" />;
	}
	if (isLoggedIn && userName === "klient") {
		return <Redirect to="/client" />;
	}

	return (
		<div className="content-header">
			<div className="container">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-8">
						<Carousel />
					</div>
					<div className="col-sm-12 col-md-12 col-lg-4">
						<div className="login-panel">
							<form className="px-4 py-3 form">
								<h4 className="head-text">Masz dane dostępowe ?</h4>
								<p>Zaloguj się do systemu</p>
								<div className="form-group">
									<label htmlFor="exampleDropdownFormEmail1">Login</label>
									<input type="text" className="form-control" onChange={e => {
										setUserName(e.target.value);
									}} placeholder="Twój login lub E-mail lub NIP" id="exampleDropdownFormEmail1" />
								</div>
								<div className="form-group">
									<label htmlFor="exampleDropdownFormPassword1">Password</label>
									<input type="password" className="form-control" onChange={e => {
										setPassword(e.target.value);
									}} id="exampleDropdownFormPassword1" placeholder="Wpisz hasło" />
								</div>
								<button type="submit" className="btn btn-outline-primary" onClick={postLogin}>Zaloguj się</button>
								<a className="recovery-password float-right" href="/">Nie pamiętasz hasła?</a>
								<div className="dropdown-divider"></div>
								<a href="/"><h4 className="head-text">Nie masz jeszcze konta ?</h4></a>
								<a href="/"><p>Rejestracja trwa zaledwie kilka minut</p></a>
								<button className="btn btn-outline-primary btn-sign-up">Zarejestruj się</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginForm;