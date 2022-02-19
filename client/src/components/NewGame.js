import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";

const NewGame = (props) => {
  const [name, setName] = useState("");
  const [yearReleased, setYearReleased] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState("");

  const submitHandle = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/games", {
        name,
        yearReleased,
        genre,
        image,
        rating,
        company,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/");
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
          Add a Game
        </h1>
        <Link to={"/"}>Return to home</Link>
      </header>

      <form onSubmit={submitHandle}>
        <div>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          {errors.name ? <p>{errors.name.message}</p> : null}
        </div>
        <div>
          <label>Year Released</label>
          <input
            value={yearReleased}
            onChange={(e) => setYearReleased(e.target.value)}
            type="text"
          />
          {errors.yearReleased ? <p>{errors.yearReleased.message}</p> : null}
        </div>
        <div>
          <label>Genre</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            name="genre"
          >
            <option value="none" defaultValue hidden>
              Select a Genre
            </option>
            <option value="Action">Action</option>
            <option value="Platformer">Platformer</option>
            <option value="Survival">Survival</option>
            <option value="RPG">RPG</option>
            <option value="RTS">RTS</option>
            <option value="MMO">MMO</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Sports">Sports</option>
            <option value="Adventure">Adventure</option>
            <option value="Children's">Children's</option>
          </select>
          {errors.genre ? <p>{errors.genre.message}</p> : null}
        </div>
        <div>
          <label>Image</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
          />
          {errors.image ? <p>{errors.image.message}</p> : null}
        </div>
        <div>
          <label>Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            name="rating"
          >
            <option value="none" defaultValue hidden>
              Select a Rating
            </option>
            <option value="T">T</option>
            <option value="E">E</option>
            <option value="MA">MA</option>
            <option value="AO">AO</option>
            <option value="E10">E10</option>
            <option value="No rating">No rating</option>
          </select>
          {errors.rating ? <p>{errors.rating.message}</p> : null}
        </div>
        <div>
          <label>company</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            type="text"
          />
        </div>
        <button>Add Game</button>
      </form>
    </div>
  );
};

export default NewGame;
