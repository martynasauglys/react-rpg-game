import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';

function Login() {
  return (
    <div>
      <h1>The most amazing online RPG game you ever play</h1>
      <LoginForm />
      <p>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  );
}

export default Login;
