import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserInfo.module.css';

function UserInfo() {
  const [user, setUser] = useState({});
  const [changeImage, setChangeImage] = useState(false);
  const [imageURL, setImageURL] = useState('');

  const [value, setValue] = useState(0);

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
        blah();
      });
  }

  function blah() {
    return () => setValue((value) => value + 1);
  }

  return (
    <div className={styles.userBox}>
      <img src={user.image} className={styles.userImage} />
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
        </div>
      ) : (
        ''
      )}
      <h2>{user.username}</h2>
      <p>Gold: {user.gold}</p>
      <p>Health: {user.health}</p>
    </div>
  );
}

export default UserInfo;
