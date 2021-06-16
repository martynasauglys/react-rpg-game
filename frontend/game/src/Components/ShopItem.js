import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ShopItem({
  id,
  type,
  name,
  defence,
  damage,
  heals,
  price,
  sellPrice,
}) {
  const history = useHistory();

  const [userGold, setUserGold] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [userInventory, setUserInventory] = useState([]);
  const [button, setButton] = useState('BUY');
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
    <div>
      <p>{type}</p>
      <p>{name}</p>
      <p>Price: {price} Gold</p>
      <p>Sell Price: {sellPrice} Gold</p>
      <button disabled={userHasItem} onClick={handleClick}>
        {button}
      </button>
      {errorMessage}
    </div>
  );
}

export default ShopItem;
