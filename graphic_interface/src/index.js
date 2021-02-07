import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SimpleTabs from "./components/Tabs/index.jsx";

ReactDOM.render(
      <div className="container">
          <SimpleTabs />
      </div>,
  document.getElementById('root')
);
