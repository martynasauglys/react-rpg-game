import React, { useEffect, useState } from 'react';
import Enemies from '../Assets/enemies.json';
import axios from 'axios';
import styles from '../Styles/Arena.module.css';
import ArenaFighterCard from '../Components/ArenaFighterCard';

function Arena() {
  let token = localStorage.getItem('token');

  const [enemy, setEnemy] = useState({});
  const [user, setUser] = useState({});
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [userHealth, setUserHealth] = useState(0);
  const [inventory, setInventory] = useState([]);

  const [attackHappening, setAttackHappening] = useState(false);
  const [fightOver, setFightOver] = useState(false);

  useEffect(() => {
    let randomEnemy = Enemies[Math.floor(Math.random() * Enemies.length)];
    setEnemy(randomEnemy);

    axios
      .get('http://localhost:3001/getUser', {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        setUser(res.data);
        setUserHealth(res.data.health);
        setInventory(res.data.inventory);
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
      console.log(inventory);
      setTimeout(() => {
        enemyAttack();
        setAttackHappening(false);
      }, 1000);
    }
  }

  function userAttack() {
    let userDamage = Math.floor(Math.random() * 50);
    checkHealth();
    setEnemyHealth(enemyHealth - userDamage);
  }

  function enemyAttack() {
    let enemyDamage = Math.floor(Math.random() * enemy.damage);
    checkHealth();
    setUserHealth(userHealth - enemyDamage);
  }

  function checkHealth() {
    if (userHealth <= 0 || enemyHealth <= 0) {
      return setFightOver(true);
    }
  }

  function healPlayer(heals, id) {
    const newInventory = inventory.filter((item) => item.heals !== heals);
    setInventory(newInventory);
    setUserHealth(userHealth + heals);

    axios
      .put(
        'http://localhost:3001/removeItem',
        { id: id },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => console.log(res));
  }
  return (
    <main>
      <div className={styles.container}>
        <ArenaFighterCard
          health={userHealth}
          image={user.image}
          name={user.username}
        />
        <div className={styles.controls_box}>
          <div className='armor'>
            <h2>Armor</h2>
            <div className={styles.items_container}>
              {inventory
                .filter((item) => item.type === 'Armor')
                .map((item) => (
                  <div
                    className={styles.item_image}
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                ))}
            </div>
          </div>
          <div className='weapons'>
            <h2>Weapons</h2>
            <div className={styles.items_container}>
              {inventory
                .filter((item) => item.type === 'Weapon')
                .map((item) => (
                  <div
                    className={styles.item_image}
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                ))}
            </div>
          </div>
          <div className='potions'>
            <h2>Potions</h2>
            <div className={styles.items_container}>
              {inventory
                .filter((item) => item.type === 'Potion')
                .map((item) => (
                  <div
                    className={styles.item_image}
                    style={{ backgroundImage: `url(${item.image})` }}
                    onClick={() => healPlayer(item.heals, item.id)}
                  ></div>
                ))}
            </div>
          </div>
          <button onClick={handleAttack} disabled={attackHappening}>
            Attack!
          </button>
        </div>
        <ArenaFighterCard
          health={enemyHealth}
          image={enemy.image}
          name={enemy.name}
        />
      </div>
    </main>
  );
}

export default Arena;
