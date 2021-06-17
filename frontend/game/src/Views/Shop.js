import React from 'react';
import ShopItems from '../Assets/shop.json';
import ShopItem from '../Components/ShopItem';
import styles from '../Styles/Shop.module.css';

function Shop() {
  return (
    <main>
      <div className={styles.items_container}>
        {ShopItems.filter((item) => item.type === 'Weapon').map((item) => (
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
            image={item.image}
            description={item.description}
          />
        ))}
      </div>
      <div className={styles.items_container}>
        {ShopItems.filter((item) => item.type === 'Armor').map((item) => (
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
            image={item.image}
            description={item.description}
          />
        ))}
      </div>
      <div className={styles.items_container}>
        {ShopItems.filter((item) => item.type === 'Potion').map((item) => (
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
            image={item.image}
            description={item.description}
          />
        ))}
      </div>
    </main>
  );
}

export default Shop;
