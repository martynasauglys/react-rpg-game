import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styles from '../Styles/ShopItem.module.css';
import ReactTooltip from 'react-tooltip';

function ShopItem({
  id,
  type,
  name,
  defence,
  damage,
  heals,
  price,
  sellPrice,
  image,
  description,
}) {
  const history = useHistory();

  const [userGold, setUserGold] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [userInventory, setUserInventory] = useState([]);
  const [button, setButton] = useState(`${price} GOLD`);
  const [userHasItem, setUserHasItem] = useState(false);

  let data = {
    id: id,
    type: type,
    name: name,
    defence: defence,
    damage: damage,
    heals: heals,
    price: price,
    sellPrice: sellPrice,
    image: image,
  };

  useEffect(() => {
    let token = localStorage.getItem('token');
    axios
      .get('http://localhost:3001/getUser', {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        setUserGold(res.data.gold);
        setUserInventory(res.data.inventory);
        console.log(image);
      });
  }, []);

  useEffect(() => {
    if (userInventory.some((item) => item.id === id)) {
      setUserHasItem(true);
      setButton('OWNED');
    }
  });

  function handleClick() {
    let token = localStorage.getItem('token');
    console.log(userHasItem);

    if (userGold >= price) {
      axios
        .put('http://localhost:3001/buyItem', data, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          history.go(0);
        });
    } else {
      setErrorMessage(`You don't have enought gold!`);
      setTimeout(() => {
        setErrorMessage('');
      }, 1000);
    }
  }
  return (
    <div className={styles.item_box}>
      <div
        data-tip={description}
        className={styles.item_image}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <p>{name}</p>
      <button disabled={userHasItem} onClick={handleClick}>
        {button}
      </button>
      <p className={styles.errorMessage}>{errorMessage}</p>
      <ReactTooltip />
    </div>
  );
}

export default ShopItem;
