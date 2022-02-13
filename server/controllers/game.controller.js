const Game = require("../models/game.model");

module.exports = {
  findAllGames: (req, res) => {
    Game.find()
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
    Game.create(req.body)
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
};
