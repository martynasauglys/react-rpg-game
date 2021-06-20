import React from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

import styles from '../Styles/Header.module.css';

function Header() {
  const history = useHistory();

  function handleClick() {
    let token = localStorage.getItem('token');
    axios
      .get('http://localhost:3001/logout', {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem('token');
        history.push('/');
        history.go(0);
      });
  }
  return (
    <header>
      <div className={styles.header_container}>
        <div className={styles.header_home_btn}>
          {localStorage.getItem('token') ? (
            <Link to='/game-window'>HOME</Link>
          ) : (
            <Link to='/register'>Register</Link>
          )}
        </div>
        {localStorage.getItem('token') ? (
          <button onClick={handleClick}>Logout</button>
        ) : (
          ''
        )}
      </div>
    </header>
  );
}

export default Header;
