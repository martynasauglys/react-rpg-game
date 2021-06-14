import React, { useEffect, useState } from 'react';
import Enemies from '../Assets/enemies.json';
import axios from 'axios';

function Arena() {
  const [enemy, setEnemy] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    let randomEnemy = Enemies[Math.floor(Math.random() * Enemies.length)];
    setEnemy(randomEnemy);

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

  function handleAttack() {
    console.log(enemy);
    console.log(user);
    setEnemy({
      enemy: {
        ...enemy,
        health: 90,
      },
    });
    console.log(enemy);
  }
  return (
    <div>
      <div>
        Enemy Health: {enemy.health}
        Your Health: {user.health}
      </div>
      <button onClick={handleAttack}>Attack!</button>
    </div>
  );
}

export default Arena;
