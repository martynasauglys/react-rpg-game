import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InventoryItemSell from '../Components/InventoryItemSell';
import styles from '../Styles/Shop.module.css';

function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem('token');
    axios
      .get('http://localhost:3001/getUser', {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        setInventory(res.data.inventory);
        console.log(inventory);
      });
  }, []);

  function handleClick() {
    console.log(inventory);
  }

  return (
    <main>
      Inventory
      <div className={styles.items_container}>
        {inventory
          .filter((item) => item.type === 'Weapon')
          .map((item) => (
            <InventoryItemSell
              key={item.id}
              id={item.id}
              type={item.type}
              name={item.name}
              sellPrice={item.sellPrice}
              image={item.image}
            />
          ))}
      </div>
      <div className={styles.items_container}>
        {inventory
          .filter((item) => item.type === 'Armor')
          .map((item) => (
            <InventoryItemSell
              key={item.id}
              id={item.id}
              type={item.type}
              name={item.name}
              sellPrice={item.sellPrice}
              image={item.image}
            />
          ))}
      </div>
      <div className={styles.items_container}>
        {inventory
          .filter((item) => item.type === 'Potion')
          .map((item) => (
            <InventoryItemSell
              key={item.id}
              id={item.id}
              type={item.type}
              name={item.name}
              sellPrice={item.sellPrice}
              image={item.image}
            />
          ))}
      </div>
    </main>
  );
}

export default Inventory;
