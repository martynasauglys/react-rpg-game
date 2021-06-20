import React from 'react';
import Navigation from '../Components/Navigation';
import UserInfo from '../Components/UserInfo';
import styles from '../Styles/GameWindow.module.css';

function GameWindow() {
  return (
    <main>
      <div className={styles.container}>
        <UserInfo />
        <Navigation />
      </div>
    </main>
  );
}

export default GameWindow;
