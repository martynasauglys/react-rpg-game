import React from 'react';
import styles from '../Styles/ArenaFighterCard.module.css';

function ArenaFighterCard({ image, name, health }) {
  return (
    <div className={styles.player_box}>
      <div
        className={styles.player_image}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <h2 className={styles.name}>{name}</h2>
      <div className='health'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/7/70/Symbolic_Love_Heart.png'
          alt=''
          style={{ width: '40px' }}
        />
        <h3>{health}</h3>
      </div>
    </div>
  );
}

export default ArenaFighterCard;
