import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InventoryItemSell from '../Components/InventoryItemSell';

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
      <div>
        {inventory.map((item) => (
          <InventoryItemSell
            name={item.name}
            sellPrice={item.sellPrice}
            id={item.id}
          />
        ))}
      </div>
    </main>
  );
}

export default Inventory;
