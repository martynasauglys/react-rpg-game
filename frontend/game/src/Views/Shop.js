import React from 'react';
import ShopItems from '../Assets/shop.json';
import ShopItem from '../Components/ShopItem';

function Shop() {
  return (
    <div>
      Shop
      <div>
        {ShopItems.map((item) => (
          <ShopItem
            key={item.id}
            id={item.id}
            type={item.type}
            name={item.name}
            abilities={item.abilities[0]}
            price={item.price}
            sellPrice={item.sellPrice}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
