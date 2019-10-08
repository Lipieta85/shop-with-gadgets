import React from 'react';
import NavMenu from './components/NavMenu';
import Slider from './components/Slider';
import LoginForm from './components/LoginForm';
import Rules from './components/Rules';
import Carousel from './components/Carousel';

function App() {
  return (
    <div className="App">
      <NavMenu />
      <LoginForm />
      <Rules />
      <Slider />
    </div>
  );
}

export default App;
