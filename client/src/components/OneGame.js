import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import Header from "./Header";
import DeleteButton from "./DeleteButton";

const OneGame = (props) => {
  const { id } = props;
  const [game, setGame] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/games/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setGame(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const deleteGame = () => {
    axios
      .delete(`http://localhost:8000/api/games/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* <header>
        <h1
          style={{
            fontSize: "50px",
            borderBottom: "5px double lightgray",
            // marginLeft: "450px",
            // marginRight: "450px",
            margin: "0 auto",
          }}
        >
          {game.name}
        </h1>
        <Link to={"/"}>Return to home</Link>
      </header> */}
      <Header link={"/"} linkText={"Return Home"} titleText={game.name} />
      <img
        src={game.image}
        alt="game"
        style={{ width: "150px", height: "150px" }}
      />
      <p>{game.genre}</p>
      <p>{game.yearReleased}</p>
      <p>{game.rating}</p>
      <p>{game.company}</p>
      <DeleteButton id={game._id} />
      {/* <button onClick={deleteGame}>Delete {game.name}</button> */}
    </div>
  );
};

export default OneGame;
