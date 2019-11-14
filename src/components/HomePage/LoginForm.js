import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "../../assets/styles/login-form.scss";
import Carousel from "./Carousel";
import { useDispatch } from "react-redux";
import { signIn } from "../../actions/authorization";
import { useSelector } from "react-redux";

const LoginForm = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.authReducer.isAuth);
    const [data] = useState({
        users: [
            // {
            //     id: 1,
            //     userName: "admin",
            //     password: "admin"
            // },
            {
                id: 2,
                userName: "klient",
                password: "klient"
            }
        ]
    });
    //const [isError, setIsError] = useState(false);
    const [loginState, setLoginState] = useState({
        login: "",
        password: ""
    });

    const onHandleChange = e => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    };

    function postLogin(e) {
        e.preventDefault();
        data.users.map(user => {
            if (
                user.userName === loginState.login &&
                user.password === loginState.password
            ) {
                dispatch(signIn({ isAuth: true }));
            }
            return null;
        });
    }

    if (isLoggedIn && loginState.login === "admin") {
        return <Redirect to="/admin" />;
    }
    if (isLoggedIn && loginState.password === "klient") {
        return <Redirect to="/customer" />;
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
                            <form
                                className="px-4 py-3 form"
                                onSubmit={e => postLogin(e)}
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
