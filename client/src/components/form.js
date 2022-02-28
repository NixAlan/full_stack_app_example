import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";

const Form = (props) => {
  // const [name, setName] = useState("");
  // const [yearReleased, setYearReleased] = useState("");
  // const [genre, setGenre] = useState("");
  // const [image, setImage] = useState("");
  // const [rating, setRating] = useState("");
  // const [company, setCompany] = useState("");
  const { game, setGame, submitHandler, errors } = props;

  const onchangeHandler = (e) => {
    const newStateObject = { ...game };

    newStateObject[e.target.name] = e.target.value;

    console.log("e.target.name =", e.target.name);
    console.log("e.target.value=", e.target.value);

    setGame(newStateObject);
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

      <form onSubmit={submitHandler}>
        <div>
          <label>Name</label>
          <input
            name="name"
            value={game.name}
            onChange={(e) => onchangeHandler(e)}
            type="text"
          />
          {errors.name ? <p>{errors.name.message}</p> : null}
        </div>
        <div>
          <label>Year Released</label>
          <input
            name="yearReleased"
            value={game.yearReleased}
            onChange={onchangeHandler}
            type="text"
          />
          {errors.yearReleased ? <p>{errors.yearReleased.message}</p> : null}
        </div>
        <div>
          <label>Genre</label>
          <select value={game.genre} onChange={onchangeHandler} name="genre">
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
            name="image"
            value={game.image}
            onChange={onchangeHandler}
            type="text"
          />
          {errors.image ? <p>{errors.image.message}</p> : null}
        </div>
        <div>
          <label>Rating</label>
          <select value={game.rating} onChange={onchangeHandler} name="rating">
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
            name="company"
            value={game.company}
            onChange={onchangeHandler}
            type="text"
          />
        </div>
        <button>Add Game</button>
      </form>
    </div>
  );
};

export default Form;
