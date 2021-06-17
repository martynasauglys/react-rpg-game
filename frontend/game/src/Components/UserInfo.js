import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../Styles/UserInfo.module.css';
import { useHistory } from 'react-router-dom';

function UserInfo() {
  const [user, setUser] = useState({});
  const [changeImage, setChangeImage] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

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
  }, []);

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
          history.go(0);
        });
    } else {
      setErrorMessage('Please add a link');
    }
  }

  return (
    <div className={styles.userBox}>
      <div
        className={styles.user_image}
        style={{ backgroundImage: `url(${user.image})` }}
      ></div>
      <button onClick={() => setChangeImage(true)}>Change Image</button>
      {changeImage ? (
        <div className={styles.change_image_container}>
          <input
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
      <h2>{user.username}</h2>
      <p>
        {user.gold} 💰 {user.health} ❤️
      </p>
    </div>
  );
}

export default UserInfo;
