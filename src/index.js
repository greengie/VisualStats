import React from 'react';
import ReactDOM from 'react-dom';
// import App from './component/App';
import route from './route'
import './stylesheet/index.css';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
  route() ,
  document.getElementById('root') ,
);
