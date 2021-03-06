import "./App.css";
import AllGames from "./components/AllGames";
import OneGame from "./components/OneGame";
import NewGame from "./components/NewGame";
import { Router } from "@reach/router";
import EditGame from "./components/EditGame";
import LogReg from "./views/LogReg";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <LogReg path="/" />
        <AllGames path="/home" />
        <NewGame path="/new" />
        <OneGame path="/game/:id" />
        <EditGame path="/game/edit/:id" />
        <Profile path="/user/profile/:username" />
      </Router>
    </div>
  );
}

export default App;
