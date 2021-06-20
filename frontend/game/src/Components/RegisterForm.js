import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../Styles/Login.module.css';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (password1 === password2) {
      axios
        .post('http://localhost:3001/signup', {
          username: username,
          password: password1,
        })
        .then((res) => {
          if (res.data.success) {
            history.push('/');
          }

          if (!res.data.success) {
            setErrorMsg(res.data.msg);
          }
        });
    } else {
      setErrorMsg('Passwords does not match');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <label>Username</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label>Password</label>
          <input
            type='password'
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label>Repeat Password</label>
          <input
            type='password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <button type='submit'>Register</button>
          <p className={styles.error_message}>{errorMsg}</p>
        </div>
        <p>
          Already have an account? <Link to='/'>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
