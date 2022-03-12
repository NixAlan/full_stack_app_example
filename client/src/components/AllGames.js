import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import Header from "./Header";
import DeleteButton from "./DeleteButton";

const AllGames = (props) => {
  const [gamesList, setGamesList] = useState([]);
  const [user, setUser] = useState({});

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

  // const deleteGame = (idFromBelow) => {
  //   axios
  //     .delete(`http://localhost:8000/api/games/${idFromBelow}`)
  //     .then((res) => {
  //       console.log(res);
  //       console.log(res.data);
  //       setGamesList(
  //         gamesList.filter((game, index) => game._id !== idFromBelow)
  //       );
  //     })
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/secure", { withCredentials: true })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logout = (e) => {
    axios
      .post(
        "http://localhost:8000/api/users/logout",
        {}, // As a post request, we must send smething with our request.
        // because we're not adding anything, we can send a simple MT object
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
          Gamemon
        </h1>
        <Link to="/new">Add a New Game</Link>
      </header> */}

      <Header link={"/new"} linkText={"Add a New Game"} titleText={"Gamemon"} />
      <Link to={`/user/profile/${user.username}`}>{user.username} Profile</Link>
      <button onClick={logout}>Log Out</button>
      {gamesList.map((game, index) => {
        return (
          <div className="gameContainer" key={index}>
            <Link to={`/user/profile/${game.createdBy.username}`}>
              Created By:{game.createdBy.username}
            </Link>

            <Link to={`/game/${game._id}`}>
              <p>{game.name}</p>
              <img
                src={game.image}
                alt="Game"
                style={{ width: "150px", height: "150px" }}
              />
            </Link>
            <Link to={`/game/edit/${game._id}`}>Edit</Link>
            {/* <button onClick={() => deleteGame(game._id)}>Delete</button> */}

            <DeleteButton
              id={game._id}
              setGamesList={setGamesList}
              gamesList={gamesList}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AllGames;
