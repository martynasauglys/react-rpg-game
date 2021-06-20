import React from 'react';
import LoginForm from '../Components/LoginForm';
import styles from '../Styles/Login.module.css';

function Login() {
  return (
    <main className={styles.login_main}>
      <h1>The most amazing online RPG game you ever play</h1>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </main>
  );
}

export default Login;
