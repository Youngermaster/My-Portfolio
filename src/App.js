import React from 'react';

import { About, Footer, Header, Skills, Work, Achievements } from './container';
import { Navbar } from './components';
import './App.scss';

const App = () => (
  <div className="app">
    <Navbar />
    <Header />
    <About />
    <Work />
    <Skills />
    <Achievements />
    <Footer />
  </div>
);

export default App;
