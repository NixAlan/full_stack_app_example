const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A game's name is required"],
      minlength: [3, "Name's length must be at least 3 characters!"],
    },
    yearReleased: {
      type: Number,
      required: [true, "A game's release year is required!"],
      min: [
        1950,
        "No video game was made before the year 1950! Pick a higher year!",
      ],
    },
    genre: {
      type: String,
      required: [true, "Need a genre!!!"],
      enum: [
        "Action",
        "Platformer",
        "Survival",
        "RPG",
        "RTS",
        "MMO",
        "Puzzle",
        "Sports",
        "Adventure",
        "Children's",
      ],
    },

    image: {
      type: String,
      required: [true, "We need a picture!"],
    },

    rating: {
      type: String,
      enum: ["T", "E", "MA", "AO", "E10", "No rating"],
    },

    company: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // must match the other Models output name
    },
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
