import React, { useRef, useEffect } from 'react';
import styles from '../Styles/ArenaFighterCard.module.css';

function ArenaFighterCard({ image, name, health }) {
  let healthbar = useRef();

  useEffect(() => {
    healthbar.current.style.width = `${health}%`;
  });
  return (
    <div className={styles.player_box}>
      <div
        className={styles.player_image}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <h2 className={styles.name}>{name}</h2>
      <div className={styles.health_bar} ref={healthbar}></div>
    </div>
  );
}

export default ArenaFighterCard;
