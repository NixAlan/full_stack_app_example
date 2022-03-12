const { findAllGames } = require("../controllers/game.controller");
const GameController = require("../controllers/game.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.get("/api/games", GameController.findAllGames);
  app.post("/api/games", authenticate, GameController.createNewGame);
  app.get(
    "/api/gamesbyuser/:username",
    authenticate,
    GameController.findAllGamesByUser
  );
  app.get("/api/games/:id", GameController.findOneGame);
  app.delete("/api/games/:id", GameController.deleteOneGame);
  app.put("/api/games/:id", GameController.updateOneGame);
};
