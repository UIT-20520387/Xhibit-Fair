import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginForm from './LoginForm';

const loginRoot = ReactDOM.createRoot(document.getElementById('login'));
loginRoot.render(
  // <React.StrictMode>
  //   <LoginForm />
  // </React.StrictMode>
  <LoginForm />
);