import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import Form from "./form";
import Header from "./Header";

const EditGame = (props) => {
  // const [name, setName] = useState("");
  // const [yearReleased, setYearReleased] = useState("");
  // const [genre, setGenre] = useState("");
  // const [image, setImage] = useState("");
  // const [rating, setRating] = useState("");
  // const [company, setCompany] = useState("");
  const { id } = props;
  const [errors, setErrors] = useState("");
  const [editedGame, setEditedGame] = useState({
    name: "",
    yearReleased: "",
    genre: "",
    image: "",
    rating: "",
    company: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/games/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setEditedGame(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const editSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/games/${id}`, editedGame)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        console.log("err.response", err.response);
        console.log("err.response.data", err.response.data);
        console.log("err.response.data.errors", err.response.data.errors);
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
          Edit a Game
        </h1>
        <Link to={"/"}>Return to home</Link>
      </header> */}
      <Header
        link={"/"}
        linkText={"Return to Home"}
        titleText={"Edit a Game"}
      />
      <Form
        game={editedGame}
        setGame={setEditedGame}
        submitHandler={editSubmitHandler}
        errors={errors}
      />
    </div>
  );
};

export default EditGame;
