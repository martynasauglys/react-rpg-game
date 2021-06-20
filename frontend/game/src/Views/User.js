import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../Styles/User.module.css';

function User() {
  const [user, setUser] = useState({});
  const [fights, setFights] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:3001/user/' + id).then((res) => {
      setUser(res.data);
      setFights(res.data.fightsHistory);
    });
  });

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.user_box}>
          <div
            className={styles.user_image}
            style={{ backgroundImage: `url(${user.image})` }}
          ></div>
          <h2>{user.username}</h2>
          <h3>{user.gold} 💰</h3>
        </div>
        <div className={styles.user_fights_box}>
          <table className={styles.table}>
            {fights.reverse().map((fight) => (
              <tr>
                <td>
                  {user.username} vs. {fight.enemy}
                </td>
                <td>
                  {fight.userWon ? (
                    <p className={styles.won}>WON</p>
                  ) : (
                    <p className={styles.lost}>LOST</p>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </main>
  );
}

export default User;
