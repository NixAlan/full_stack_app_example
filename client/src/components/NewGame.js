import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import Form from "./form";
import Header from "./Header";

const NewGame = (props) => {
  // const [name, setName] = useState("");
  // const [yearReleased, setYearReleased] = useState("");
  // const [genre, setGenre] = useState("");
  // const [image, setImage] = useState("");
  // const [rating, setRating] = useState("");
  // const [company, setCompany] = useState("");
  const [errors, setErrors] = useState("");
  const [newGame, setNewGame] = useState({
    name: "",
    yearReleased: "",
    genre: "",
    image: "",
    rating: "",
    company: "",
  });

  const NewSubmitHandle = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/games", newGame, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        console.log("err.response", err.response);
        console.log("err.response.data", err.response.data);
        console.log("err.response.data", err.response.data.errors);
        setErrors(err.response.data.errors);
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
          Add a Game
        </h1>
        <Link to={"/"}>Return to home</Link>
      </header> */}
      <Header link={"/"} linkText={"Return Home"} titleText={"Add A Game"} />
      <Form
        game={newGame}
        setGame={setNewGame}
        submitHandler={NewSubmitHandle}
        errors={errors}
      />
    </div>
  );
};

export default NewGame;
