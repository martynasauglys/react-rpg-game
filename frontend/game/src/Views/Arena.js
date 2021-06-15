import React, { useEffect, useState } from 'react';
import Enemies from '../Assets/enemies.json';
import axios from 'axios';

function Arena() {
  const [enemy, setEnemy] = useState({});
  const [user, setUser] = useState({});
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [userHealth, setUserHealth] = useState(0);
  const [attackHappening, setAttackHappening] = useState(false);
  const [fightOver, setFightOver] = useState(false);

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
        setUser(res.data);
        setUserHealth(res.data.health);
        console.log('Arena');
      });
  }, []);

  function handleAttack() {
    let userDamage = Math.floor(Math.random() * 12);
    if (userHealth <= 0 || enemyHealth <= 0) {
      setFightOver(true);
    } else {
      setAttackHappening(true);
      setEnemyHealth(enemyHealth - userDamage);
      setTimeout(() => {
        enemyAttack();
      }, 1000);
    }
  }

  function enemyAttack() {
    let enemyDamage = Math.floor(Math.random() * enemy.damage);
    if (userHealth <= 0 || enemyHealth <= 0) {
      setFightOver(true);
    } else {
      setUserHealth(userHealth - enemyDamage);
      setAttackHappening(false);
    }
  }
  return (
    <div>
      <div>
        Enemy Health: {enemyHealth}
        Your Health: {userHealth}
      </div>
      <button disabled={attackHappening} onClick={handleAttack}>
        Attack!
      </button>
      {fightOver ? <p>GG</p> : ''}
    </div>
  );
}

export default Arena;
