import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Enemies from '../Assets/enemies.json';
import axios from 'axios';
import styles from '../Styles/Arena.module.css';
import ArenaFighterCard from '../Components/ArenaFighterCard';

function Arena() {
  const history = useHistory();
  let token = localStorage.getItem('token');

  const [enemy, setEnemy] = useState({});
  const [user, setUser] = useState({});
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [userHealth, setUserHealth] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [selectedWeapon, setSelectedWeapon] = useState(0);
  const [selectedArmor, setSelectedArmor] = useState(0);
  const [playerWon, setPlayerWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [specialMessage, setSpecialMessage] = useState('');
  const [weaponMsg, setWeaponMsg] = useState('No weapon selected');
  const [armorMsg, setArmorMsg] = useState('No armor selected');

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
  }, [token]);

  function setWeapon(id, name) {
    setSelectedWeapon(id);
    setWeaponMsg(`${name} selected as weapon`);
  }

  function setArmor(id, def, name) {
    setSelectedArmor(def);
    setArmorMsg(`${name} selected as armor`);
  }

  function handleAttack() {
    let userAttDamage;
    let userDeffence = selectedArmor;
    let enemyAttDamage;

    if (userHealth < 0) {
      setPlayerWon(false);
      console.log('you lose');
      setGameOver(true);
    } else if (enemyHealth < 0) {
      setPlayerWon(true);
      console.log('you won');
      setGameOver(true);
    }

    // Checking selected weapon

    if (selectedWeapon === 4) {
      let special = Math.floor(Math.random() * 5);
      if (special <= 1) {
        enemyAttDamage = 0;
        userAttDamage = Math.floor(Math.random() * 8);
        setSpecialMessage('Enemy Attack Blocked!');
      } else {
        enemyAttDamage = Math.floor(Math.random() * enemy.damage);
        userAttDamage = Math.floor(Math.random() * 8);
      }
    } else if (selectedWeapon === 5) {
      let special = Math.floor(Math.random() * 10);
      if (special <= 3) {
        enemyAttDamage = Math.floor(Math.random() * enemy.damage);
        userAttDamage = Math.floor(Math.random() * 6) * 2;
        setSpecialMessage('Dobule Attack!');
      } else {
        enemyAttDamage = Math.floor(Math.random() * enemy.damage);
        userAttDamage = Math.floor(Math.random() * 6);
      }
    } else if (selectedWeapon === 6) {
      let special = Math.floor(Math.random() * 10);
      if (special <= 4) {
        setUserHealth(userHealth + 10);
        userAttDamage = Math.floor(Math.random() * 5);
        enemyAttDamage = Math.floor(Math.random() * enemy.damage);
        setSpecialMessage('+ 10hp!');
      } else {
        userAttDamage = Math.floor(Math.random() * 5);
        enemyAttDamage = Math.floor(Math.random() * enemy.damage);
      }
    } else {
      enemyAttDamage = Math.floor(Math.random() * enemy.damage);
      userAttDamage = Math.floor(Math.random() * 3);
    }

    setEnemyHealth(enemyHealth - userAttDamage);

    if (userDeffence > enemyAttDamage) {
      return;
    } else {
      setUserHealth(userHealth - enemyAttDamage + userDeffence);
    }

    setTimeout(() => {
      setSpecialMessage('');
    }, 2000);
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

  function endMatch() {
    let finalHealth;
    if (playerWon) {
      axios
        .put(
          'http://localhost:3001/updateGold',
          { add: enemy.reward },
          {
            headers: {
              token: token,
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    }
    axios
      .put(
        'http://localhost:3001/matchResults',
        { enemy: enemy.name, userWon: playerWon },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
    if (userHealth <= 0) {
      finalHealth = 0;
    } else {
      finalHealth = userHealth;
    }
    axios
      .put(
        'http://localhost:3001/updateHealth',
        { health: finalHealth },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
    history.push('/game-window');
    history.go(0);
  }
  return (
    <main>
      <div className={styles.container}>
        <ArenaFighterCard
          health={userHealth}
          image={user.image}
          name={user.username}
        />
        <p className={styles.special_message}>{specialMessage}</p>
        <div className={styles.controls_box}>
          <div>
            <h2>Armor</h2>
            <div className={styles.items_container}>
              {inventory
                .filter((item) => item.type === 'Armor')
                .map((item) => (
                  <div
                    className={styles.item_image}
                    style={{ backgroundImage: `url(${item.image})` }}
                    onClick={() => setArmor(item.defence, item.id, item.name)}
                  ></div>
                ))}
            </div>
          </div>
          <div>
            <h2>Weapons</h2>
            <div className={styles.items_container}>
              {inventory
                .filter((item) => item.type === 'Weapon')
                .map((item) => (
                  <div
                    className={styles.item_image}
                    style={{ backgroundImage: `url(${item.image})` }}
                    onClick={() => setWeapon(item.id, item.name)}
                  ></div>
                ))}
            </div>
          </div>
          <div>
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
            <button className={styles.attack_button} onClick={handleAttack}>
              Attack!
            </button>
          </div>
        </div>
        <ArenaFighterCard
          health={enemyHealth}
          image={enemy.image}
          name={enemy.name}
        />
      </div>
      <div className={styles.weapons_selected_box}>
        <p className={styles.weapons_msg}>{weaponMsg}</p>
        <p className={styles.weapons_msg}>{armorMsg}</p>
      </div>
      {gameOver ? (
        <div className={styles.popup}>
          <div className={styles.popup_inner}>
            {playerWon ? (
              <p className={styles.popup_msg}>You won!</p>
            ) : (
              <p className={styles.popup_msg}>You've died...</p>
            )}
            <button onClick={endMatch} className={styles.proceed_btn}>
              Proceed
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default Arena;
