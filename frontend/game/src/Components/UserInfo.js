import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserInfo.module.css';

function UserInfo() {
  const [user, setUser] = useState({});

  useEffect(() => {
    let token = localStorage.getItem('token');
    axios
      .get('http://localhost:3001/getUser', {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
  }, []);
  return (
    <div className={styles.userBox}>
      <img src={user.image} className={styles.userImage} />
      <h2>{user.username}</h2>
      <p>Gold: {user.gold}</p>
      <p>Health: {user.health}</p>
    </div>
  );
}

export default UserInfo;
