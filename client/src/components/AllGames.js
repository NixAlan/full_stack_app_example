import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@reach/router";

const AllGames = (props) => {
  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/games")
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setGamesList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteGame = (idFromBelow) => {
    axios
      .delete(`http://localhost:8000/api/games/${idFromBelow}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setGamesList(
          gamesList.filter((game, index) => game._id !== idFromBelow)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <header>
        <h1
          style={{
            fontSize: "50px",
            borderBottom: "5px double lightgray",
            // marginLeft: "450px",
            // marginRight: "450px",
            margin: "0 auto",
          }}
        >
          Gamemon
        </h1>
        <Link to="/new">Add a New Game</Link>
      </header>
      {gamesList.map((game, index) => {
        return (
          <div key={index}>
            <Link to={`/game/${game._id}`}>
              <p>{game.name}</p>
              <img
                src={game.image}
                alt="Game"
                style={{ width: "150px", height: "150px" }}
              />
            </Link>
            <Link to={`/game/edit/${game._id}`}>Edit</Link>
            <button onClick={() => deleteGame(game._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default AllGames;
