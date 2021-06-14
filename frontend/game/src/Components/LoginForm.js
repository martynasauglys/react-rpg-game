import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post('http://localhost:3001/login', {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.success) {
          setErrorMsg(res.data.msg);
        }

        if (res.data.success) {
          setErrorMsg('');
          localStorage.setItem('token', res.data.token);
          console.log('redirect should happen');
          history.push('/game-window');
          history.go(0);
        }
      });
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <button type='submit'>Login</button>
          <p>{errorMsg}</p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
