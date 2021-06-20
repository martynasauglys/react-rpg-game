import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../Styles/UserInfo.module.css';

function UserInfo() {
  const [user, setUser] = useState({});
  const [changeImage, setChangeImage] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userDead, setUserDead] = useState(false);

  let token = localStorage.getItem('token');

  useEffect(() => {
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
    if (user.health === 0) {
      setUserDead(true);
    } else {
      setUserDead(false);
    }
  }, [imageURL, token, user.health, userDead]);

  function handleImageChange() {
    if (imageURL) {
      axios
        .put(
          'http://localhost:3001/changeImage',
          { image: imageURL },
          {
            headers: {
              token: token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setImageURL('');
        });
    } else {
      setErrorMessage('Please add a link');
    }
  }

  function reviveUser() {
    axios.put(
      'http://localhost:3001/updateHealth',
      { health: 100 },
      {
        headers: {
          token: token,
        },
      }
    );

    setUserDead(false);
  }

  return (
    <div className={styles.userBox}>
      <div
        onClick={() => setChangeImage(!changeImage)}
        className={styles.user_image}
        style={{ backgroundImage: `url(${user.image})` }}
      ></div>
      {changeImage ? (
        <div className={styles.change_image_container}>
          <input
            className={styles.input}
            type='text'
            placeholder='Paste image url'
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
          <button onClick={handleImageChange}>Change!</button>
          {errorMessage}
        </div>
      ) : (
        ''
      )}
      <h2 className={styles.username}>{user.username}</h2>
      <p className={styles.stats}>
        {user.gold} 💰 {user.health} ❤️
      </p>
      {userDead ? (
        <div className={styles.user_dead_box}>
          <p>You're dead</p>
          <button onClick={reviveUser}>Revive</button>
        </div>
      ) : null}
    </div>
  );
}

export default UserInfo;
