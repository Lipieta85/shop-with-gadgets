import React from 'react';
import "../assets/styles/login-form.scss"
import imageGallery from '../assets/images/intro_1.jpg'
import Carousel from './Carousel';

const LoginForm = () => {
	return (
		<div className="content-header">
			<div className="container-fluid">
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
									<input type="text" className="form-control" placeholder="Twój login lub E-mail lub NIP" id="exampleDropdownFormEmail1" />
								</div>
								<div className="form-group">
									<label htmlFor="exampleDropdownFormPassword1">Password</label>
									<input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Wpisz hasło" />
								</div>
								<button type="submit" className="btn btn-default wide-auto">Zaloguj się</button>
								<a className="recovery-password float-right" href="/">Nie pamiętasz hasła?</a>
								<div className="dropdown-divider"></div>
								<a href="/"><h4 className="head-text">Nie masz jeszcze konta ?</h4></a>
								<a href="/"><p>Rejestracja trwa zaledwie kilka minut</p></a>
								<button className="btn btn-default">Zarejestruj się</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginForm;