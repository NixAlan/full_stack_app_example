import "./App.css";
import AllGames from "./components/AllGames";
import OneGame from "./components/OneGame";
import NewGame from "./components/NewGame";
import { Router } from "@reach/router";
import EditGame from "./components/EditGame";

function App() {
  return (
    <div className="App">
      <Router>
        <AllGames path="/" />
        <NewGame path="/new" />
        <OneGame path="/game/:id" />
        <EditGame path="/game/edit/:id" />
      </Router>
    </div>
  );
}

export default App;
