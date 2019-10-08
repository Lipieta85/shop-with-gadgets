import React from 'react';
import './App.css';
import Footer from "./components/Footer";
import NavMenu from './components/NavMenu';
import Slider from './components/Slider';
import LoginForm from './components/LoginForm';
import Rules from './components/Rules';

function App() {
  return (
    <div className="App">
      <NavMenu />
      <LoginForm />
      <Rules />
      <Slider />
      <Footer />
    </div>
  );
}

export default App;
