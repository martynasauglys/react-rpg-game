import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import UserInfo from '../Components/UserInfo';
import styles from './GameWindow.module.css';

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
