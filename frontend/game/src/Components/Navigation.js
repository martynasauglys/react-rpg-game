import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Styles/Navigation.module.css';

function Navigation() {
  return (
    <div className={styles.navigation_container}>
      <Link to='/arena'>Arena 🏟️</Link>
      <Link to='/shop'>Shop 🛒</Link>
      <Link to='/inventory'>Inventory 📦</Link>
      <Link to='/leaderboard'>Leaderboard 🎲</Link>
    </div>
  );
}

export default Navigation;
