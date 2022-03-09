import React from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const Deletbutton = (props) => {
  const { id, gamesList, setGamesList } = props;

  const deleteFilter = (id) => {
    setGamesList(gamesList.filter((game, index) => game._id !== id));
  };

  const deleteHandler = () => {
    axios
      .delete(`http://localhost:8000/api/games/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);

        if (gamesList) {
          deleteFilter(id);
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return <button onClick={deleteHandler}>Delete</button>;
};

export default Deletbutton;
