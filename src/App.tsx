import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomeScreen } from './screens';
import { Header } from './components';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" Component={HomeScreen} />
          {/* All other screen routes here*/}
        </Routes >
      </div>
    </Router>
  );
};
export default App;
