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
            defence={item.defence}
            damage={item.damage}
            heals={item.heals}
            price={item.price}
            sellPrice={item.sellPrice}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
