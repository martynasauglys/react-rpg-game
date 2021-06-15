import React from 'react';
import axios from 'axios';

function ShopItem({ id, type, name, abilities, price, sellPrice }) {
  function handleClick() {
    let token = localStorage.getItem('token');

    let data = {
      id: id,
      type: type,
      name: name,
      abilities: abilities,
      price: price,
      sellPrice: sellPrice,
    };

    axios
      .put('http://localhost:3001/buyItem', data, {
        headers: {
          token: token,
        },
      })
      .then((res) => console.log(res));
  }
  return (
    <div>
      <p>{type}</p>
      <p>{name}</p>
      <p>{abilities}</p>
      <p>Price: {price} Gold</p>
      <p>Sell Price: {sellPrice} Gold</p>
      <button onClick={handleClick}>Buy</button>
    </div>
  );
}

export default ShopItem;
