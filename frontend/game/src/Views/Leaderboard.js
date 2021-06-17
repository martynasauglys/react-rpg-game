import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../Styles/Leaderboard.module.css';

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/getAllUsers').then((res) => {
      let filtered = res.data.sort((a, b) => {
        return b.gold - a.gold;
      });
      setUsers(filtered);
    });
  }, []);
  return (
    <main>
      <div className={styles.container}>
        <table>
          {users.map((user) => (
            <tr>
              <td className={styles.user}>
                <div
                  className={styles.user_image}
                  style={{ backgroundImage: `url(${user.image})` }}
                ></div>
                {user.username}
              </td>
              <td className={styles.gold}>{user.gold} 💰</td>
            </tr>
          ))}
        </table>
      </div>
    </main>
  );
}

export default Leaderboard;
