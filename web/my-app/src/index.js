import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import'./Css/Authentication/Login.css';
import App from './App';
import FileReader from './Component/FileReader'
//import Login from './Component/Authentication/Login'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <FileReader/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
