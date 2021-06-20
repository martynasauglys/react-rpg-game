import React from 'react';
import axios from 'axios';
import styles from '../Styles/ShopItem.module.css';

function InventoryItemSell({ id, name, sellPrice, image }) {
  function handleClick() {
    let token = localStorage.getItem('token');
    axios
      .put(
        'http://localhost:3001/sellItem',
        { id: id, sellPrice: sellPrice },
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
  return (
    <div className={styles.item_box}>
      <div
        className={styles.item_image}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <p className={styles.item_name}>{name}</p>
      <button className={styles.buy_button} onClick={handleClick}>
        Sell for {sellPrice} gold
      </button>
    </div>
  );
}

export default InventoryItemSell;
