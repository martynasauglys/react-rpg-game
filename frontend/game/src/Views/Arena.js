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
    if (userHealth <= 0 || enemyHealth <= 0) {
      setFightOver(true);
      if (userHealth < 0) {
        setUserHealth(0);
      } else if (enemyHealth < 0) {
        setEnemyHealth(0);
      }
    } else {
      setAttackHappening(true);
      userAttack();
      setTimeout(() => {
        enemyAttack();
        setAttackHappening(false);
      }, 1000);
    }
  }

  function userAttack() {
    let userDamage = Math.floor(Math.random() * 50);
    setEnemyHealth(enemyHealth - userDamage);
    checkHealth();
  }

  function enemyAttack() {
    let enemyDamage = Math.floor(Math.random() * enemy.damage);
    setUserHealth(userHealth - enemyDamage);
    checkHealth();
  }

  function checkHealth() {
    if (userHealth <= 0 || enemyHealth <= 0) {
      return setFightOver(true);
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
