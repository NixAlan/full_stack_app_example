const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Passwords must be at least 8 Characters"],
    },
  },
  { timestamps: true }
);

// virtual Field

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

// http://mongoosejs.com/docs/middleware.html#pre
// http://mongoosejs.com/docs/middleware.html
// middleware affects/ in the middle of a process
// pre validate automaticaly runs before any save moddleware
UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords must match"); // "confirmPassword" must match from line 26
    console.log("Passwords do not match");
  }
  next();
});

UserSchema.pre("save", function (next) {
  console.log("in pre save");
  //hash the password before its saved to the db
  //remember we know the match from middleware above
  bcrypt.hash(this.password, 10).then((hashedPassword) => {
    //five our password the value of the returned hash
    this.password = hashedPassword;
    next();
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
