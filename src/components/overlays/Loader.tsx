import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
  return (
    <div data-testid="loader" className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
