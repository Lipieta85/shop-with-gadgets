import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./assets/styles/bootstrap/filtron.scss"
import Footer from "./components/Footer";
import NavMenu from './components/NavMenu';
import Slider from './components/Slider';
import LoginForm from './components/LoginForm';
import Rules from './components/Rules';
import Products from './components/Products';
import Basket from './components/ClientPanel/Basket';
import Products2 from './components/ClientPanel/Products2';
import AdminPanel from './components/AdminPanel/AdminPanel';
import NavMenuClient from './components/ClientPanel/NavMenuClient';
import PrivateRoute from './authentication/PrivateRoute';
import { AuthContext } from './authentication/Auth';

function App() {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Route path="/" component={NavMenu} />
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/" component={Rules} />
        <Route exact path="/" component={Slider} />
        <Route exact path="/" component={Footer} />
        <PrivateRoute path="/admin" component={AdminPanel} />
        <PrivateRoute path="/admin" component={Products} />
        <PrivateRoute path="/admin" component={NavMenu} />
        <PrivateRoute path="/client" component={NavMenuClient} />
        <PrivateRoute path="/client" component={Products2} />
        <PrivateRoute path="/Basket" component={NavMenuClient} />
        <PrivateRoute path="/Basket" component={Basket} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
