import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomeScreen } from './screens';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import { Header } from './components';
import './App.css';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" Component={HomeScreen} />
            {/* All other screen routes here*/}
          </Routes >
        </div>
      </Router>
    </ApolloProvider>
  );
};
export default App;
