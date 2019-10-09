import React from 'react';
import Footer from "./components/Footer";
import NavMenu from './components/NavMenu';
import Slider from './components/Slider';
import LoginForm from './components/LoginForm';
import Rules from './components/Rules';
import Products from './components/Products';

function App() {
  return (
    <div className="App">
      <NavMenu />
      <LoginForm />
      <Products />
      <Rules />
      <Slider />
      <Footer />
    </div>
  );
}

export default App;
