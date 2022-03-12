const Game = require("../models/game.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const gameRoutes = require("../routes/game.routes");

module.exports = {
  findAllGames: (req, res) => {
    Game.find()
      .populate("createdBy", "username email")
      .then((allGames) => {
        console.log(allGames);
        res.json(allGames);
      })
      .catch((err) => {
        console.log("Find All Games Failed");
        res.json({ message: "something went wrong in findall", error: err });
      });
  },

  createNewGame: (req, res) => {
    const newGameObject = new Game(req.body);
    //usertoken is the name of the cookie that we gave it in the user controller
    //.
    // const decodedJWT = jwt.decode(req.cookies.userToken, {
    //   complete: true,
    // });

    newGameObject.createdBy = req.jwtpayload.id;

    console.log(`devlog `, newGameObject.createdBy);
    // newGameObject.createdBy = decodedJWT.payload.id;

    newGameObject
      .save()
      .then((newGame) => {
        console.log(newGame);
        res.json(newGame);
      })
      .catch((err) => {
        console.log("Something went wrong in createNewGame");
        res.status(400).json(err);
      });
  },
  findOneGame: (req, res) => {
    Game.findOne({ _id: req.params.id })
      .then((oneGame) => {
        console.log(oneGame);
        res.json(oneGame);
      })
      .catch((err) => {
        console.log("Find one Game Failed");
        res.json({ message: "something went wrong in one game", error: err });
      });
  },

  deleteOneGame: (req, res) => {
    Game.deleteOne({ _id: req.params.id })
      .then((delteedGame) => {
        console.log(delteedGame);
        res.json(delteedGame);
      })
      .catch((err) => {
        console.log("Delete one Game Failed");
        res.json({
          message: "something went wrong deleting a game",
          error: err,
        });
      });
  },

  updateOneGame: (req, res) => {
    Game.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedGame) => {
        console.log(updatedGame);
        res.json(updatedGame);
      })
      .catch((err) => {
        console.log("something went wrong in updating Game");
        res.status(400).json(err);
      });
  },

  findAllGamesByUser: (req, res) => {
    if (req.jwtpayload.username !== req.params.username) {
      User.findOne({ username: req.params.username })
        .then((userNotLoggedIn) => {
          Game.find({ createdBy: userNotLoggedIn._id })
            .populate("createdBy", "username")
            .then((allGamesFromUser) => {
              console.log(allGamesFromUser);
              res.json(allGamesFromUser);
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json(err);
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    } else {
      Game.find({ createdBy: req.jwtpayload.id })
        .populate("createdBy", "username")
        .then((allGamesFromLoggedInUser) => {
          console.log(allGamesFromLoggedInUser);
          res.json(allGamesFromLoggedInUser);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  },
};
