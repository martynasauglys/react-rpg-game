import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function InventoryItemSell({ id, name, sellPrice }) {
  const history = useHistory();
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
        history.go(0);
      });
  }
  return (
    <div>
      <p>{name}</p>
      <button onClick={handleClick}>Sell for {sellPrice} gold</button>
    </div>
  );
}

export default InventoryItemSell;
