import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './Views/Register';
import Login from './Views/Login';
import Header from './Components/Header';
import GameWindow from './Views/GameWindow';
import Arena from './Views/Arena';
import Leaderboard from './Views/Leaderboard';
import Inventory from './Views/Inventory';
import Shop from './Views/Shop';
import User from './Views/User';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    let token = localStorage.getItem('token');
    axios
      .get('http://localhost:3001/getUser', {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  }, [user]);

  return (
    <div className='App'>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/game-window'>
            <GameWindow />
          </Route>
          <Route path='/shop'>
            <Shop gold={user.gold} />
          </Route>
          <Route path='/arena'>
            <Arena />
          </Route>
          <Route path='/inventory'>
            <Inventory inventory={user.inventory} />
          </Route>
          <Route path='/leaderboard'>
            <Leaderboard />
          </Route>
          <Route path='/user/:id'>
            <User />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
