import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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
      <div>
        <div>LOGO</div>
        <button onClick={handleClick}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
