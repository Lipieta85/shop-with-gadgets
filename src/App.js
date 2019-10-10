import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./assets/styles/theme.css"
import Footer from "./components/Footer";
import NavMenu from './components/NavMenu';
import Slider from './components/Slider';
import LoginForm from './components/LoginForm';
import Rules from './components/Rules';
import Products from './components/Products';
import AdminPanel from './components/AdminPanel/AdminPanel'
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
        <div>
          <Route path="/" component={NavMenu} />
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/" component={Rules} />
          <Route exact path="/" component={Slider} />
          <Route exact path="/" component={Footer} />
          <PrivateRoute path="/admin" component={AdminPanel} />
          <PrivateRoute path="/admin" component={Products} />
          <PrivateRoute path="/admin" component={NavMenu} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
