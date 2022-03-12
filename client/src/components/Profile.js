import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const Profile = (props) => {
  const { username } = props;
  const [userGameList, setUserGameList] = useState([]);

  useEffect(() => {
    axios

      .get(`http://localhost:8000/api/gamesbyuser/${username}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUserGameList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>welcome {username}</h1>
      {console.log("devlog", { userGameList })};
      {userGameList.map((game, index) => {
        return (
          <div key={index}>
            <p>{game.name}</p>
            <p>{game.genre}</p>
            <p>{game.yearReleased}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
