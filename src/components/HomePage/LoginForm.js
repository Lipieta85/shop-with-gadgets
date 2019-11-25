import React, { useState } from "react";
import "../../assets/styles/login-form.scss";
import Carousel from "./Carousel";
import { useDispatch } from "react-redux";
import { signIn } from "../../actions/authorization";
import sha256 from "js-sha256";
import { getToken, getUserData } from "../../api/index";

const LoginForm = () => {
    const dispatch = useDispatch();

    const [loginState, setLoginState] = useState({
        login: "",
        password: "",
    });

    const onHandleChange = e => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    };

    const getSessionToken = e => {
        e.preventDefault();
        const password = sha256(loginState.password);

        const userData = btoa(loginState.login + ":" + password);
        getToken(userData)
            .then(res => {
                console.log(res);
                //const token = res.data.token.split(".");
                //const userID = JSON.parse(atob(token[1]));
                //sessionStorage.setItem("userID", userID.userId);
                sessionStorage.setItem("token", res.data.token);
                getUserData(res.data.token).then(userInfo => {
                    console.log(userInfo);
                    dispatch(signIn({ isAuth: true }));
                });
            })
            .catch(err => console.log(err.response));
    };

    return (
        <div className="content-header">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-8">
                        <Carousel />
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4">
                        <div className="login-panel">
                            <form
                                className="px-4 py-3 form"
                                onSubmit={getSessionToken}
                            >
                                <h4 className="head-text">
                                    Masz dane dostępowe ?
                                </h4>
                                <p>Zaloguj się do systemu</p>
                                <div className="form-group">
                                    <label htmlFor="exampleDropdownFormEmail1">
                                        Login
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={loginState.login}
                                        id="login"
                                        onChange={onHandleChange}
                                        placeholder="Twój login lub E-mail lub NIP"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleDropdownFormPassword1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={loginState.password}
                                        id="password"
                                        onChange={onHandleChange}
                                        placeholder="Wpisz hasło"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-outline-primary"
                                    // onClick={e => postLogin()}
                                >
                                    Zaloguj się
                                </button>
                                <a
                                    className="recovery-password float-right"
                                    href="/"
                                >
                                    Nie pamiętasz hasła?
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="/">
                                    <h4 className="head-text">
                                        Nie masz jeszcze konta ?
                                    </h4>
                                </a>
                                <a href="/">
                                    <p>Rejestracja trwa zaledwie kilka minut</p>
                                </a>
                                <button className="btn btn-outline-primary btn-sign-up">
                                    Zarejestruj się
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
