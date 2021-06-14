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

function App() {
  return (
    <div className='App'>
      <Router>
        {localStorage.getItem('token') ? <Header /> : null}
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
            <Shop />
          </Route>
          <Route path='/arena'>
            <Arena />
          </Route>
          <Route path='/inventory'>
            <Inventory />
          </Route>
          <Route path='/leaderboard'>
            <Leaderboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
